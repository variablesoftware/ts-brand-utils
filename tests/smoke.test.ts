import { test } from 'vitest';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';

function run(cmd, opts = {}) {
  return execSync(cmd, { stdio: 'inherit', ...opts });
}

const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'vs-brand-utils-smoke-'));
const origCwd = process.cwd();

test('npm package can be installed and imported (smoke test)', async () => {
  try {
    // Pack the current package
    run('npm pack');
    const pkg = fs.readdirSync(origCwd).find(f => f.endsWith('.tgz'));
    if (!pkg) throw new Error('No package tarball found');

    // Init a new project in the temp dir
    process.chdir(tmpDir);
    run('npm init -y');
    run(`npm install ${path.join(origCwd, pkg)}`);

    // Try to import the package
    const pkgJson = JSON.parse(fs.readFileSync(path.join(origCwd, 'package.json'), 'utf8'));
    const entry = pkgJson.main || 'index.js';
    const entryPath = path.join(tmpDir, 'node_modules', pkgJson.name, entry);
    await import(entryPath);
    console.log('Smoke test passed: package can be installed and imported.');
  } catch (e) {
    console.error('Smoke test failed:', e);
    throw e;
  } finally {
    process.chdir(origCwd);
    // Clean up tarball
    const tarballs = fs.readdirSync(origCwd).filter(f => f.endsWith('.tgz'));
    for (const t of tarballs) fs.unlinkSync(path.join(origCwd, t));
  }
}, 120_000);
