#!/usr/bin/env node

const { spawnSync } = require('child_process');
const coffeeFilePath = process.argv[2]; // Get the file path from the command line arguments

if (!coffeeFilePath) {
  console.error('Please provide a file path argument');
  process.exit(1);
}

function getBinaryFromBin(name){
  return path.join(__dirname, 'node_modules', '.bin', name)
}

/*
function getBinaryFromSource(name){
  return path.join(require.resolve('decaffeinate'), `../../bin/${name}`)
}
*/

const path = require('path');

const absoluteCoffeePath = `${process.cwd()}/${coffeeFilePath}`
const dirPath = path.dirname(absoluteCoffeePath);
const extName = path.extname(absoluteCoffeePath);
const baseName = path.basename(absoluteCoffeePath, extName);
const jsFilePath = `${dirPath}/${baseName}.js`

const dependencies = [
  { 
    description: 'Decaffeinating the file...',
    name: getBinaryFromBin('decaffeinate'),
    command: absoluteCoffeePath,
    args: ['--optional-chaining'] 
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
  { 
    description: 'Converting this.get to get(this...',
    name: getBinaryFromBin('ember-v2-codemods'), 
    command: 'legacy-get-codemod',
    args: [jsFilePath] 
  },
  { 
    description: 'Converting this.set to set(this...',
    name: getBinaryFromBin('ember-v2-codemods'), 
    command: 'legacy-set-codemod',
    args: [jsFilePath] 
  },
  { 
    description: 'Converting this.setProperties to setProperties(this...',
    name: getBinaryFromBin('ember-v2-codemods'), 
    command: 'legacy-setProperties-codemod',
    args: [jsFilePath] 
  },
  { 
    description: 'Converting this.getProperties to getProperties(this...',
    name: getBinaryFromBin('ember-v2-codemods'), 
    command: 'legacy-getProperties-codemod',
    args: [jsFilePath] 
  },
  { 
    description: 'Converting Ember.Component.extend({ to Component.extend({...',
    name: getBinaryFromBin('ember-modules-codemod'), 
    command: jsFilePath,
    args: [] 
  },
  { 
    description: 'Converting computed(function() to computed({get()...',
    name: getBinaryFromBin('ember-computed-getter-codemod'), 
    command: 'ember-computed-getter-codemod',
    args: [jsFilePath] 
  },
];

for (let i = 0; i < dependencies.length; i++) {
  const dependency = dependencies[i];

  console.info(`\x1b[33m ${dependency.description} \x1b[0m`);

  let options = { stdio: ['inherit', 'inherit', 'pipe'] };

  const result = spawnSync(dependency.name, [dependency.command, ...dependency.args], options);

  if (result.status !== 0) {
    console.error(`Command failed: ${dependency.name} ${dependency.command} ${dependency.args.join(' ')}`);
    console.error(result);
    process.exit(1);
    break
  }
}
