
const { spawnSync } = require('child_process');
const { getFilePaths } = require('../shared/utils')
const fs = require('fs')

module.exports = function (args) {
  const { absJsPath } = getFilePaths(args)

  try {
    if (!fs.existsSync(absJsPath)) {
      return console.error('File does not exist yet, did you mean to convert first? File: \n', absJsPath)
    }

    const dependencies = [
      {
        description: "Fixing possible issues... Pass 1",
        name: "eslint",
        binary: "npx",
        command: `eslint`,
        args: [`${absJsPath}`, "--fix",],
      },
      {
        description: "Fixing possible issues... Pass 2",
        name: "eslint",
        binary: "npx",
        command: `eslint`,
        args: [`${absJsPath}`, "--fix",],
      }
    ]

    for (const dependency of dependencies) {
      console.info(
        `\x1b[94m${dependency.name}: ${dependency.description} \x1b[0m`
      );
    
      const result = spawnSync(
        dependency.binary,
        [dependency.command, ...dependency.args],
        { stdio: ["inherit", "inherit", "pipe"], shell: true }
      );
      
      if (result.status === 2) {
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

    console.info(
      `\x1b[94mLinting complete, remember to manually fix the outstanding ones! \x1b[0m`
    );

  } catch(err) {
    console.error('lint:', err)
  }
};
