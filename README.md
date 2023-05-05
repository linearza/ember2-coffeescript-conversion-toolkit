# ember2-coffeescript-conversion-toolkit

Automates decaffeination and applies basic codemods to emulate an ember 2.18 state - in preparation for further upgrades.

## Install
```
yarn global add e2cct
```

## Usage
```
e2cct decaf --path=path/to/my/file.coffee
```


### Dependencies
* https://github.com/decaffeinate/decaffeinate
* https://github.com/jmdejno/lil-codemods
* https://github.com/linearza/ember-v2-codemods
* https://github.com/ember-codemods/ember-3x-codemods

### Workflow
1. decaffeinate
2. ember-v2-codemods legacy-observer-codemod
3. ember-v2-codemods legacy-computed-codemod
4. lil-codemods run get 
5. lil-codemods run set 
6. lil-codemods run get-properties 
7. lil-codemods run get-properties 
8. lil-codemods run unused-imports 

Planned:
- Delete coffee file
- Sort class
- Prettify

### Reset
```
git reset --hard
git clean -f
```



