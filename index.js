#!/usr/bin/env node
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const pkg = require('./package.json')

const argv = yargs(hideBin(process.argv))
  .version(pkg.version)
  .alias('v', 'version')
  .command('convert [file] [optional: --lint]', 'Decaffeinate and codemod a file', (yargs) => {
    yargs.positional('file', {
        describe: 'file to convert',
        default: null
      }).option('lint', {
        alias: 'l',
        describe: 'Lint file post convert'
      }).option('clean', {
        alias: 'c',
        describe: 'Remove .original.coffee files post convert'
      })
    return yargs
  }, (argv) => {
    if (!argv.file) {
      return console.error('Please provide a file path')
    }

    const script = require(`./commands/convert.js`);
    script(argv)
    return argv
  })
  .command('lint [file]', 'Lint and fix possible issues', (yargs) => {
    yargs.positional('file', {
        describe: 'file to lint',
        default: null
      })
    return yargs
  }, (argv) => {
    if (!argv.file) {
      return console.error('Please provide a file path')
    }

    const script = require(`./commands/lint.js`);
    script(argv)
    return argv
  })
  .command(require('./commands/update.js'))
  .command(require('./commands/reset.js'))
  .command(require('./commands/clean.js'))
  .help()
  .parse()