# ember2-coffeescript-conversion-toolkit

Automates decaffeination and applies basic codemods to emulate an ember 2.x state Ember app - in preparation for further upgrades.

Some of the https://github.com/linearza/ember-v2-codemods were inspired by:
* https://github.com/jmdejno/lil-codemods
* https://github.com/ember-codemods/ember-3x-codemods

The main differences are around how imports are handled, and slight improvements like the lack of user prompt inputs, to make the process more fluid.

## Install
```
npm install e2cct -g
```

## Usage
```
e2cct path/to/my/file.coffee
```

### Automated workflow
1. 'Decaffeinating the file...',
2. 'Converting .property() to computed()...',
3. 'Converting .observes() to observer()...',
4. 'Converting this.get to get(this...',
5. 'Converting this.set to set(this...',
6. 'Converting this.setProperties to setProperties(this...',
7. 'Converting this.getProperties to getProperties(this...',
8. 'Converting Ember.Component.extend({ to Component.extend({...'
9. 'Converting computed(function() to computed({get()...'

### Manual workflow
Once you have run the automated conversion, there are some manual steps required:
1. Merge any imports depending on the same declarations (potential for automation)
2. Do logic comparison and check for any flags - feel free to open an issue here if required
3. Finally, delete the old .coffee file

### Planned improvements
- Merge imports
- Unused imports
- Delete coffee file
- Sort class
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



