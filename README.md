# ember2-coffeescript-conversion-toolkit

Automates decaffeination and applies basic codemods to emulate an ember 2.x state Ember app in flux - in preparation for further upgrades.

Some of the https://github.com/linearza/ember-v2-codemods mods were inspired by:
* https://github.com/jmdejno/lil-codemods
* https://github.com/ember-codemods/ember-3x-codemods

The main differences are around how imports are handled, and slight improvements like the lack of user prompt inputs, in order to automate the process in this toolkit.

## Install
```
npm install ember2-coffeescript-conversion-toolkit -g
```
## Commands
```
e2cct [command]

Commands:
  e2cct convert [file] [optional: --lint]  Decaffeinate and codemod a file
  e2cct lint [file]                        Lint and fix possible issues
  e2cct update                             Update e2cct to the latest version
  e2cct reset                              Caution: Reverts unstaged changes and
                                           decaffeinate commits.
  e2cct clean                              Remove the .original.coffee artifact
                                           files

Options:
      --help     Show help                                             [boolean]
  -v, --version  Show version number                                   [boolean]

```

### Automated workflow
1. decaffeinate: Decaffeinating the file...
2. legacy-computed-codemod: Converting .property() to computed()...
3. legacy-observer-codemod: Converting .observes() to observer()...
4. legacy-get-codemod: Converting this.get to get(this...
5. legacy-set-codemod: Converting this.set to set(this...
6. legacy-setProperties-codemod: Converting this.setProperties to setProperties(this...
7. legacy-getProperties-codemod: Converting this.getProperties to getProperties(this...
8. ember-modules-codemod: Converting Ember.Component.extend({ to Component.extend({...
9. ember-computed-getter-codemod: Converting computed(function() to computed({get()...

### Linting
Linting can be done as part of the conversion process if passing in the optional `--lint` or `-l` alias with the convert command, eg `e2cct path/to/file.coffee --lint`.
Alternatively is done separately as final step. 
Rules are inherited from the project.

NOTE: With bigger files you might have to run the linting more than once, we automatically do 2 passes for convenience. In case you still see the message indicating potentially fixable issues with the '--fix' option after the conversion, you can manually run linting again using `e2cct lint`

#### Eslint and Prettier rules
This toolkit makes the assumption that your project already aligns the prettier and eslint rules. If not, the automated fixing might result in a half-baked solution which potentially does not match your existing linting checks.

### Git history
Worth noting is that `bulk-decaffeinate` specifically aims to retain git history on files converted through it, nevertheless, if you squash the commits upon merging, instead of creating a merge commit you will lose some ability to navigate the history as per normal on providers like Github. That being said, the history is always traceable via the original commit which references the old `.coffee` file. Additionally you can use the following command to log the full file history:

```
git log --oneline --follow --all -- path/to/my/converted/file.js
```

### Manual workflow
Once you have run the automated conversion, there are some manual steps required:
1. Merge any imports depending on the same declarations if required
2. Check if any Prettify rules are not yet applied, and amend.
3. Add order category comments, eg: `// Services`
4. Do logic sanity check - feel free to open an issue here if you spot something
5. Finally, delete the old .coffee file

### Planned improvements
- Unused imports
- Delete coffee file
- Update mod lifecycle hooks like: .on('willDestroyElement')

### References
* https://github.com/decaffeinate/decaffeinate
* https://github.com/linearza/ember-v2-codemods
* https://github.com/ember-codemods/ember-3x-codemods



