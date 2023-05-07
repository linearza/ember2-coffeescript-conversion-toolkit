# ember2-coffeescript-conversion-toolkit

Automates decaffeination and applies basic codemods to emulate an ember 2.18 state - in preparation for further upgrades.

Some of the https://github.com/linearza/ember-v2-codemods codemods have been inspired by https://github.com/jmdejno/lil-codemods and https://github.com/ember-codemods/ember-3x-codemods 
The main differences are around how imports are handled, and slight improvements like the lack of user prompt inputs, to make the process more fluid.

## Install
```
npm install e2cct -g
```

## Usage
```
e2cct path/to/my/file.coffee
```

### Dependencies
* https://github.com/decaffeinate/decaffeinate
* https://github.com/linearza/ember-v2-codemods
* https://github.com/ember-codemods/ember-3x-codemods

### Workflow
1. description: 'Decaffeinating the file...',
2. description: 'Converting .property() to computed()...',
3. description: 'Converting .observes() to observer()...',
4. description: 'Converting this.get to get(this...',
5. description: 'Converting this.set to set(this...',
6. description: 'Converting this.setProperties to setProperties(this...',
7. description: 'Converting this.getProperties to getProperties(this...',

Planned:


https://github.com/ember-codemods/ember-modules-codemod
https://github.com/ember-codemods/ember-computed-getter-codemod

- Merge imports
- Unused imports
- Delete coffee file
- Sort class
- Prettify

### Reset
```
git reset --hard
git clean -f
```



