const { resolve } = require("path")
const path = require("path");

module.exports.getFilePaths = function(args) {
  const filePath = args.file
  const dirPath = path.dirname(filePath);
  const extName = path.extname(filePath);
  const baseName = path.basename(filePath, extName);

  const absoluteCoffeePath = resolve(`${dirPath}/${baseName}.coffee`);
  const absoluteJsFilePath = resolve(`${dirPath}/${baseName}.js`);

  return {
    absCsPath: absoluteCoffeePath,
    absJsPath: absoluteJsFilePath
  }
}
