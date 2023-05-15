const { spawnSync } = require('child_process');
const { getBinaryFromBin } = require('../shared/utils')

exports.command = 'clean'
exports.describe = 'Remove the .original.coffee artifact files'
exports.builder = {}

exports.handler = function (/* argv */) {  
  console.info(
    `\x1b[94me2cct: Removing .original.coffee files... \x1b[0m`
  );
  
  const result = spawnSync(getBinaryFromBin("bulk-decaffeinate"), ['clean'], { stdio: ["inherit", "inherit", "pipe"] });

  if (result.status !== 0) {
    console.error(`e2cct: Clean failed with code ${result.status}: ${result.stderr}`);
  } else {
    console.info(
      `\x1b[94me2cct: Clean done \x1b[0m`
    );
  }
}
