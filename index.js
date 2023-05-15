#!/usr/bin/env node
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

const argv = yargs(hideBin(process.argv))
  .command('convert [file]', 'Decaffeinate and codemod a file', (yargs) => {
    yargs.positional('file', {
        describe: 'file to convert',
        default: null
      })
    yargs.option('lint', {
        alias: 'l',
        describe: 'Lint file post convert'
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
  .help()
  .parse()