#!/usr/bin/env node

const { spawnSync } = require('child_process');

console.info(
  `\x1b[94me2cct: Updating your e2cct global... \x1b[0m`
);

const result = spawnSync('sh', ['-c', 'npm update -g ember2-coffeescript-conversion-toolkit'], { stdio: 'inherit', stderr: 'inherit' });

if (result.status !== 0) {
  console.error(`e2cct: Update failed with code ${result.status}: ${result.stderr}`);
} else {
  console.info(
    `\x1b[94me2cct: Update done \x1b[0m`
  );
}