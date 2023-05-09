#!/usr/bin/env node

const { spawnSync } = require("child_process");
const args = process.argv[2];

if (!args) {
  console.error("e2cct: Please provide a file path argument, or run reset/update");
  process.exit(1);
}

if (['reset', 'update'].includes(args)) {
  return require(`./${args}.js`);
}

const coffeeFilePath = args;

function getBinaryFromBin(name) {
  return path.join(__dirname, "node_modules", ".bin", name);
}

/*
function getBinaryFromSource(name){
  return path.join(require.resolve('decaffeinate'), `../../bin/${name}`)
}
*/

const path = require("path");
const dirPath = path.dirname(coffeeFilePath);
const extName = path.extname(coffeeFilePath);
const baseName = path.basename(coffeeFilePath, extName);

const absoluteCoffeePath = `${process.cwd()}/${coffeeFilePath}`;
const absoluteJsFilePath = `${process.cwd()}/${dirPath}/${baseName}.js`;

const dependencies = [
  {
    description: "Decaffeinating the file...",
    name: "decaffeinate",
    binary: getBinaryFromBin("decaffeinate"),
    command: absoluteCoffeePath,
    args: ["--optional-chaining"],
  },
  {
    description: "Converting .property() to computed()...",
    name: "legacy-computed-codemod",
    binary: getBinaryFromBin("ember-v2-codemods"),
    command: "legacy-computed-codemod",
    args: [absoluteJsFilePath],
  },
  {
    description: "Converting .observes() to observer()...",
    name: "legacy-observer-codemod",
    binary: getBinaryFromBin("ember-v2-codemods"),
    command: "legacy-observer-codemod",
    args: [absoluteJsFilePath],
  },
  {
    description: "Converting this.get to get(this...",
    name: "legacy-get-codemod",
    binary: getBinaryFromBin("ember-v2-codemods"),
    command: "legacy-get-codemod",
    args: [absoluteJsFilePath],
  },
  {
    description: "Converting this.set to set(this...",
    name: "legacy-set-codemod",
    binary: getBinaryFromBin("ember-v2-codemods"),
    command: "legacy-set-codemod",
    args: [absoluteJsFilePath],
  },
  {
    description: "Converting this.setProperties to setProperties(this...",
    name: "legacy-setProperties-codemod",
    binary: getBinaryFromBin("ember-v2-codemods"),
    command: "legacy-setProperties-codemod",
    args: [absoluteJsFilePath],
  },
  {
    description: "Converting this.getProperties to getProperties(this...",
    name: "legacy-getProperties-codemod",
    binary: getBinaryFromBin("ember-v2-codemods"),
    command: "legacy-getProperties-codemod",
    args: [absoluteJsFilePath],
  },
  {
    description: "Converting Ember.Component.extend({ to Component.extend({...",
    name: "ember-modules-codemod",
    binary: getBinaryFromBin("ember-modules-codemod"),
    command: absoluteJsFilePath,
    args: [],
  },
  {
    description: "Converting computed(function() to computed({get()...",
    name: "ember-computed-getter-codemod",
    binary: getBinaryFromBin("ember-computed-getter-codemod"),
    command: "ember-computed-getter-codemod",
    args: [absoluteJsFilePath],
  },
  {
    description: "Fixing eslint issues...",
    name: "eslint",
    binary: "npx",
    command: `eslint`,
    args: [`${absoluteJsFilePath}`, "--fix"],
  },
];

for (let i = 0; i < dependencies.length; i++) {
  const dependency = dependencies[i];

  console.info(
    `\x1b[94m${dependency.name}: ${dependency.description} \x1b[0m`
  );

  const result = spawnSync(
    dependency.binary,
    [dependency.command, ...dependency.args],
    { stdio: ["inherit", "inherit", "pipe"] }
  );

  if (result.status !== 0 && !["eslint"].includes(dependency.command)) {
    console.error(
      `Command failed: ${dependency.name}, command: ${
        dependency.command
      }, args: ${dependency.args.join(" ")}`
    );
    console.error(result);
    process.exitCode = 1;
    break;
  }
}
