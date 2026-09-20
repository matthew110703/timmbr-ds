import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

console.log('🚀 Building Storybook and topological monorepo dependencies...');
execSync('pnpm turbo run build --filter=@timmbr/storybook...', { stdio: 'inherit' });

const srcDir = path.resolve('apps/storybook/storybook-static');
const destDir = path.resolve('storybook-static');

if (fs.existsSync(srcDir)) {
  fs.cpSync(srcDir, destDir, { recursive: true });
  console.log(`✅ Successfully mirrored ${srcDir} → ${destDir}`);
} else {
  console.error(`❌ Expected build output directory not found at ${srcDir}`);
  process.exit(1);
}
