#!/usr/bin/env node

const { spawnSync } = require('child_process');
const filePath = process.argv[2]; // Get the file path from the command line arguments

if (!filePath) {
  console.error('Please provide a file path argument');
  process.exit(1);
}

// const dependencies = [
//   { name: 'decaffeinate', command: 'run decaffeinate', args: [filePath, '--optional-chaining'] },
//   /*
//   { name: 'ember-3x-codemods', command: 'run', args: ['my-command', filePath] },
//   { name: 'ember-v2-codemods', command: 'run', args: ['my-command', filePath] },
//   { name: 'lil-codemods', command: 'run', args: ['my-command', filePath] },
//   */
// ];


const path = require('path');

const decaffeinateBinary = path.join(require.resolve('decaffeinate'), '../../bin/decaffeinate');

const dependencies = [
  { name: 'decaffeinate', command: decaffeinateBinary, args: [filePath, '--optional-chaining'] },
];


/*
decaffeinate path/to/file.coffee --optional-chaining

npx ember-3x-codemods fpe-observes path/to/file.js

npx yarn legacy-computed-codemod path/to/file.js

npx lil-codemods run get 

npx lil-codemods run set 

npx lil-codemods run get-properties 

npx lil-codemods run get-properties 

npx lil-codemods run unused-imports 


*/

for (let i = 0; i < dependencies.length; i++) {
  const dependency = dependencies[i];

  try {
    const result = spawnSync(dependency.name, [dependency.command, ...dependency.args], { stdio: 'inherit' });

    if (result.status !== 0) {
      console.error(`Command failed: ${dependency.name} ${dependency.command} ${dependency.args.join(' ')}`);
      process.exit(1);
    }
  } catch (e) {
    console.log('>>>', e)
  }
}
