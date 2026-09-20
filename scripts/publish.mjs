#!/usr/bin/env node

/**
 * Timmbr Design System - Workspace Publisher Script
 * 
 * Supports:
 *   1. Publish all with changesets / version check:
 *      pnpm run publish:all
 *   2. Publish specific workspace(s):
 *      pnpm run publish ui theme
 *      pnpm run publish @timmbr/icons
 *   3. Dry-run mode:
 *      pnpm run publish --dry-run
 *      pnpm run publish ui --dry-run
 */

import { execSync } from 'node:child_process';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';

const ROOT_DIR = process.cwd();

// Publishable workspace packages map
const PUBLISHABLE_PACKAGES = {
  ui: { name: '@timmbr/ui', dir: 'packages/ui' },
  motion: { name: '@timmbr/motion', dir: 'packages/motion' },
  theme: { name: '@timmbr/theme', dir: 'packages/theme' },
  icons: { name: '@timmbr/icons', dir: 'packages/icons' },
  hooks: { name: '@timmbr/hooks', dir: 'packages/hooks' },
  utils: { name: '@timmbr/utils', dir: 'packages/utils' },
};

// Aliases for full scoped names
const SCOPED_NAME_MAP = Object.fromEntries(
  Object.entries(PUBLISHABLE_PACKAGES).map(([shortKey, item]) => [item.name, shortKey])
);

function printHelp() {
  console.log(`
Timmbr Design System - Workspace Publisher

Usage:
  pnpm run publish:all          Publish all workspaces with new versions / changesets
  pnpm run publish <pkgs...>    Publish specific workspace(s) (e.g., pnpm run publish ui theme)
  pnpm run publish --dry-run    Simulate publishing without pushing to npm

Available Workspaces:
  ui       -> @timmbr/ui
  motion   -> @timmbr/motion
  theme    -> @timmbr/theme
  icons    -> @timmbr/icons
  hooks    -> @timmbr/hooks
  utils    -> @timmbr/utils
`);
}

async function isVersionPublished(packageName, version) {
  try {
    const encoded = encodeURIComponent(packageName);
    const url = `https://registry.npmjs.org/${encoded}`;
    const res = await fetch(url, {
      headers: {
        Accept: 'application/json',
      },
    });

    if (res.status === 404) {
      // Package does not exist yet on npm -> definitely new
      return false;
    }

    if (res.ok) {
      const data = await res.json();
      if (data.versions && data.versions[version]) {
        return true;
      }
      return false;
    }

    // Fallback: try npm view
    const output = execSync(`npm view ${packageName}@${version} version --json`, {
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe'],
    });
    return output.trim().includes(version);
  } catch {
    // If npm view errors with E404, it's not published
    return false;
  }
}

function hasPendingChangesets() {
  const changesetDir = resolve(ROOT_DIR, '.changeset');
  if (!existsSync(changesetDir)) return false;
  const files = readdirSync(changesetDir);
  return files.some(
    (file) => file.endsWith('.md') && file.toLowerCase() !== 'readme.md'
  );
}

async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    printHelp();
    process.exit(0);
  }

  const isDryRun = args.includes('--dry-run');
  const cleanArgs = args.filter((arg) => arg !== '--dry-run' && arg !== '--all');

  const isAll = args.includes('--all') || cleanArgs.length === 0 || cleanArgs.includes('all');

  // Determine target packages
  let targetKeys = [];

  if (isAll) {
    targetKeys = Object.keys(PUBLISHABLE_PACKAGES);
  } else {
    for (const rawArg of cleanArgs) {
      const normalized = rawArg.toLowerCase().trim();
      if (PUBLISHABLE_PACKAGES[normalized]) {
        targetKeys.push(normalized);
      } else if (SCOPED_NAME_MAP[normalized]) {
        targetKeys.push(SCOPED_NAME_MAP[normalized]);
      } else {
        console.error(`❌ Unknown workspace package: "${rawArg}"`);
        console.error(`Valid options: ${Object.keys(PUBLISHABLE_PACKAGES).join(', ')}`);
        process.exit(1);
      }
    }
  }

  // Deduplicate
  targetKeys = [...new Set(targetKeys)];

  console.log('='.repeat(65));
  console.log(`📦 Timmbr Design System Publisher ${isDryRun ? '(DRY RUN)' : ''}`);
  console.log('='.repeat(65));

  // 1. If publishing all, check and apply pending changesets
  if (isAll && hasPendingChangesets()) {
    console.log('\n🦋 Found pending changesets. Applying version bumps...');
    try {
      execSync('pnpm changeset version', { stdio: 'inherit', cwd: ROOT_DIR });
      console.log('🔨 Rebuilding monorepo after changeset versioning...');
      execSync('pnpm run build', { stdio: 'inherit', cwd: ROOT_DIR });
    } catch (err) {
      console.error('❌ Failed to process changesets or rebuild packages:', err.message);
      process.exit(1);
    }
  }

  console.log(`\n🔍 Checking ${targetKeys.length} package(s) against npm registry...\n`);

  const results = [];

  for (const key of targetKeys) {
    const pkgInfo = PUBLISHABLE_PACKAGES[key];
    const pkgJsonPath = resolve(ROOT_DIR, pkgInfo.dir, 'package.json');
    const pkgJson = JSON.parse(readFileSync(pkgJsonPath, 'utf8'));
    const { name, version } = pkgJson;

    const alreadyPublished = await isVersionPublished(name, version);

    if (alreadyPublished) {
      console.log(`⏭️  [SKIPPED] ${name}@${version} is already published on npm.`);
      results.push({ name, version, status: 'SKIPPED (Already Published)' });
      continue;
    }

    console.log(`🚀 [PUBLISHING] ${name}@${version} ${isDryRun ? '(Dry Run)' : ''}...`);

    try {
      const publishCmd = `pnpm --filter ${name} publish --access public --no-git-checks ${
        isDryRun ? '--dry-run' : ''
      }`;
      execSync(publishCmd, { stdio: 'inherit', cwd: ROOT_DIR });
      console.log(`✅ [SUCCESS] ${name}@${version} published successfully!\n`);
      results.push({ name, version, status: isDryRun ? 'SUCCESS (Dry Run)' : 'PUBLISHED' });
    } catch (err) {
      console.error(`❌ [FAILED] Could not publish ${name}@${version}:`);
      console.error(err.message);
      results.push({ name, version, status: 'FAILED' });
    }
  }

  console.log('\n' + '='.repeat(65));
  console.log('📊 Publish Summary');
  console.log('='.repeat(65));
  console.table(results);

  const hasFailures = results.some((r) => r.status === 'FAILED');
  if (hasFailures) {
    console.error('\n⚠️ Some packages failed to publish. Ensure you are logged into npm (run `npm login`).');
    process.exit(1);
  } else {
    console.log('\n🎉 All operations completed successfully.');
  }
}

main().catch((err) => {
  console.error('Fatal error during publish execution:', err);
  process.exit(1);
});
