const { spawnSync } = require('child_process');
const readline = require('readline');

async function confirm(question) {
  const line = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  return new Promise((resolve) => {
    line.question(question, (response) => {
      line.close()
      resolve(response.toLowerCase() === 'y')
    })
  })
}

exports.command = 'reset'
exports.describe = 'Caution: Reverts unstaged changes and decaffeinate commits.'
exports.builder = {}

exports.handler = async function (/* argv */) {

  const result = spawnSync('git', ['log', '--oneline'], { stdio: 'pipe', encoding: 'utf-8' });

  if (result.stdout) {
    const output = result.stdout.trim().split('\n').slice(0, 3).join('\n');
    console.log('Last 3 commits in the git tree:');
    console.log(output);
    if (output.indexOf('decaffeinate:') < 1) {
      console.log(`\x1b[31mIt looks like you don't have recent decaffeinations. Continuing with the reset will undo the last 2 listed commits!\x1b[0m`);
    }
  }

  const confirmed = await confirm(`\x1b[38;2;255;165;0mAre you sure you want to reset? [Y/n] \x1b[0m`)

  if (confirmed) {
    console.info(
      `\x1b[94me2cct: Resetting your git state... \x1b[0m`
    );
    
    const result = spawnSync('sh', ['-c', 'git reset HEAD~ && git reset HEAD~ && git reset --hard && git clean -f']);
    
    if (result.status !== 0) {
      console.error(`e2cct: Reset failed with code ${result.status}: ${result.stderr}`);
    } else {
      console.info(
        `\x1b[94me2cct: Reset done \x1b[0m`
      );
    }
  }
}