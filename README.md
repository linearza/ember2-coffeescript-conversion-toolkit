# ember2-coffeescript-conversion-toolkit

Automates decaffeination and applies basic codemods to emulate an ember 2.x state Ember app in flux - in preparation for further upgrades.

Some of the https://github.com/linearza/ember-v2-codemods were inspired by:
* https://github.com/jmdejno/lil-codemods
* https://github.com/ember-codemods/ember-3x-codemods

The main differences are around how imports are handled, and slight improvements like the lack of user prompt inputs, to make the process more fluid.

## Install
```
npm install ember2-coffeescript-conversion-toolkit -g
```
## Commands
#### Convert
```
e2cct path/to/my/file.coffee
```
#### Reset
Reset ALL git changes on the branch, including the conversion
```
e2cct reset
```

#### Update
Update to the latest version of e2cct
```
e2cct update
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
10. eslint: Fixing eslint issues...

### Manual workflow
Once you have run the automated conversion, there are some manual steps required:
1. Merge any imports depending on the same declarations if required
2. Prettify
3. Add order category comments, eg: `// Services`
4. Do logic comparison and check for any obvious issues - feel free to open an issue here if you spot something
5. Finally, delete the old .coffee file

### Planned improvements
- Merge imports (beta)
- Unused imports
- Delete coffee file
- Prettify
- Update mod lifecycle hooks like: .on('willDestroyElement')

### References
* https://github.com/decaffeinate/decaffeinate
* https://github.com/linearza/ember-v2-codemods
* https://github.com/ember-codemods/ember-3x-codemods
### Reset
```
git reset --hard
git clean -f
```



