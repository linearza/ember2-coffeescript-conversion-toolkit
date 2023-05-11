#!/usr/bin/env node

const { spawnSync } = require('child_process');

console.info(
  `\x1b[94me2cct: Resetting your git state... \x1b[0m`
);

const result = spawnSync('sh', ['-c', 'git reset HEAD~ && git reset HEAD~ && git reset --hard && git clean -f']);

if (result.status !== 0) {
  console.error(`e2cct: Reset failed with code ${result.status}: ${result.stderr}`);
} else {
  console.info(
    `\x1b[94me2cct: Reset done \x1b[0m`
  );
}