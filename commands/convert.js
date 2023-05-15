
const { spawnSync } = require('child_process');
const root = `${__dirname}/..`
const { getFilePaths, getBinaryFromBin } = require('../shared/utils')

module.exports = function(args) {
  const { absCsPath, absJsPath } = getFilePaths(args)
  
  const dependencies = [
    {
      description: "Bulk decaffeinating the file...",
      name: "bulk-decaffeinate",
      binary: getBinaryFromBin("bulk-decaffeinate"),
      command: "convert",
      args: [`-f`, `${absCsPath}`, `--config`, `${root}/bulk-decaffeinate.config.js`],
    },
    {
      description: "Converting .property() to computed()...",
      name: "legacy-computed-codemod",
      binary: getBinaryFromBin("ember-v2-codemods"),
      command: "legacy-computed-codemod",
      args: [absJsPath],
    },
    {
      description: "Converting .observes() to observer()...",
      name: "legacy-observer-codemod",
      binary: getBinaryFromBin("ember-v2-codemods"),
      command: "legacy-observer-codemod",
      args: [absJsPath],
    },
    {
      description: "Converting this.get to get(this...",
      name: "legacy-get-codemod",
      binary: getBinaryFromBin("ember-v2-codemods"),
      command: "legacy-get-codemod",
      args: [absJsPath],
    },
    {
      description: "Converting this.set to set(this...",
      name: "legacy-set-codemod",
      binary: getBinaryFromBin("ember-v2-codemods"),
      command: "legacy-set-codemod",
      args: [absJsPath],
    },
    {
      description: "Converting this.setProperties to setProperties(this...",
      name: "legacy-setProperties-codemod",
      binary: getBinaryFromBin("ember-v2-codemods"),
      command: "legacy-setProperties-codemod",
      args: [absJsPath],
    },
    {
      description: "Converting this.getProperties to getProperties(this...",
      name: "legacy-getProperties-codemod",
      binary: getBinaryFromBin("ember-v2-codemods"),
      command: "legacy-getProperties-codemod",
      args: [absJsPath],
    },
    {
      description: "Converting Ember.Component.extend({ to Component.extend({...",
      name: "ember-modules-codemod",
      binary: getBinaryFromBin("ember-modules-codemod"),
      command: absJsPath,
      args: [],
    },
    {
      description: "Converting computed(function() to computed({get()...",
      name: "ember-computed-getter-codemod",
      binary: getBinaryFromBin("ember-computed-getter-codemod"),
      command: "ember-computed-getter-codemod",
      args: [absJsPath],
    },
  ];

  for (const dependency of dependencies) {
    console.info(
      `\x1b[94m${dependency.name}: ${dependency.description} \x1b[0m`
    );
  
    const result = spawnSync(
      dependency.binary,
      [dependency.command, ...dependency.args],
      { stdio: ["inherit", "inherit", "pipe"] }
    );
  
    if (result.status !== 0) {
      console.error(
        `Command failed: ${dependency.name}, command: ${
          dependency.command
        }, args: ${dependency.args.join(" ")}`
      );
      console.error(result.output[2].toString());
      process.exitCode = 1;
      break;
    }
  }

  if (args.lint){
    const lint = require('./lint')
    return lint(args)
  }
};

