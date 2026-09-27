#!/usr/bin/env node

import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const ROOT_DIR = process.cwd();
const PACKAGES_DIR = path.resolve(ROOT_DIR, "packages");
const APPS_DIR = path.resolve(ROOT_DIR, "apps");

function getAvailablePackages() {
  const map = new Map();

  const scanDir = (dir) => {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const pkgPath = path.resolve(dir, entry.name, "package.json");
        if (fs.existsSync(pkgPath)) {
          try {
            const json = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
            if (json.name) {
              map.set(entry.name.toLowerCase(), json.name);
              map.set(json.name.toLowerCase(), json.name);
              const withoutScope = json.name.replace(/^@[^/]+\//, "").toLowerCase();
              map.set(withoutScope, json.name);
            }
          } catch {}
        }
      }
    }
  };

  scanDir(PACKAGES_DIR);
  scanDir(APPS_DIR);

  return map;
}

const args = process.argv.slice(2);

if (args.length === 0) {
  try {
    execSync("turbo run build", { stdio: "inherit" });
  } catch (err) {
    process.exit(err.status || 1);
  }
} else {
  const packageMap = getAvailablePackages();
  const filters = [];
  const extraArgs = [];

  for (const arg of args) {
    if (arg.startsWith("-")) {
      extraArgs.push(arg);
    } else {
      const resolved = packageMap.get(arg.trim().toLowerCase());
      if (resolved) {
        filters.push(`--filter=${resolved}`);
      } else {
        const target = arg.startsWith("@") ? arg : `@timmbr/${arg}`;
        filters.push(`--filter=${target}`);
      }
    }
  }

  const cmd = ["turbo run build", ...filters, ...extraArgs].join(" ");
  try {
    execSync(cmd, { stdio: "inherit" });
  } catch (err) {
    process.exit(err.status || 1);
  }
}
