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

function getBinaryFromBin(name){
  return path.join(__dirname, 'node_modules', '.bin', name)
}

function getBinaryFromSource(name){
  return path.join(require.resolve('decaffeinate'), `../../bin/${name}`)
}


const path = require('path');

const dirPath = path.dirname(filePath);
const extName = path.extname(filePath);
const baseName = path.basename(filePath, extName);
const jsFilePath = `${process.cwd()}/${dirPath}/${baseName}.js`

// console.log('>>>')
// console.log(filePath)
// console.log(dirPath)
// console.log(extName)
// console.log(baseName)
// console.log(jsFilePath)

const dependencies = [
  { 
    description: 'Decaffeinating the file...',
    name: getBinaryFromBin('decaffeinate'),
    command: filePath,
    args: ['--optional-chaining'] 
  },
  { 
    description: 'Converting .observes() to observer()...',
    name: getBinaryFromBin('ember-3x-codemods'), 
    command: 'fpe-observes',
    args: [jsFilePath] 
  },
  { 
    description: 'Converting .property() to computed()...',
    name: getBinaryFromBin('ember-v2-codemods'), 
    command: 'legacy-computed-codemod',
    args: [jsFilePath] 
  },
  { 
    description: 'Converting .observes() to observer()...',
    name: getBinaryFromBin('ember-v2-codemods'), 
    command: 'legacy-observer-codemod',
    args: [jsFilePath] 
  },
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

  console.info(`\x1b[33m ${dependency.description} \x1b[0m`);

  const result = spawnSync(dependency.name, [dependency.command, ...dependency.args], { stdio: 'inherit' });

  if (result.status !== 0) {
    console.error(`Command failed: ${dependency.name} ${dependency.command} ${dependency.args.join(' ')}`);
    console.error(result);
    process.exit(1);
    break
  }
}
