#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const ROOT_DIR = process.cwd();
const PACKAGES_DIR = path.resolve(ROOT_DIR, "packages");

const targetFilter = process.argv[2]; // e.g. "ui" or "@timmbr/ui"

function getPackages() {
  if (!fs.existsSync(PACKAGES_DIR)) return [];
  const entries = fs.readdirSync(PACKAGES_DIR, { withFileTypes: true });
  const pkgs = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const pkgPath = path.resolve(PACKAGES_DIR, entry.name, "package.json");
      if (fs.existsSync(pkgPath)) {
        try {
          const json = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
          if (json.name && json.name.startsWith("@timmbr/")) {
            pkgs.push({
              name: json.name,
              shortName: entry.name,
              dir: path.resolve(PACKAGES_DIR, entry.name),
            });
          }
        } catch {}
      }
    }
  }

  return pkgs;
}

const allPkgs = getPackages();
const pkgsToPush = targetFilter
  ? allPkgs.filter(
      (p) =>
        p.name === targetFilter ||
        p.shortName === targetFilter ||
        p.name === `@timmbr/${targetFilter}`
    )
  : allPkgs.filter(
      (p) => !p.name.includes("tsconfig") && !p.name.includes("eslint-config")
    );

if (pkgsToPush.length === 0) {
  console.error(`\x1b[31m[ERROR] No matching package found for: ${targetFilter}\x1b[0m`);
  process.exit(1);
}

console.log("\n🚀 Building packages before push...\n");
for (const pkg of pkgsToPush) {
  console.log(`🔨 Building \x1b[1m${pkg.name}\x1b[0m...`);
  try {
    execSync(`pnpm --filter "${pkg.name}" build`, {
      cwd: ROOT_DIR,
      stdio: "inherit",
    });
  } catch {
    console.warn(`⚠️ Build failed or not defined for ${pkg.name}, proceeding with push...`);
  }
}

console.log("\n📦 Pushing to connected projects via Yalc...\n");
for (const pkg of pkgsToPush) {
  try {
    execSync(`pnpm dlx yalc push`, {
      cwd: pkg.dir,
      stdio: "inherit",
    });
    console.log(`\x1b[32m✔ Pushed ${pkg.name}\x1b[0m`);
  } catch (err) {
    console.error(`\x1b[31m✖ Failed pushing ${pkg.name}: ${err.message}\x1b[0m`);
  }
}

console.log("\n\x1b[32m✔ All packages built and pushed to consumers (timmbr-console, timmbr-storefront)!\x1b[0m\n");
