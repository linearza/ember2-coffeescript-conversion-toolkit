const path = require("path");

module.exports.getFilePaths = function(args) {
  const filePath = args.file
  const dirPath = path.dirname(filePath);
  const extName = path.extname(filePath);
  const baseName = path.basename(filePath, extName);

  const absoluteCoffeePath = `${process.cwd()}/${filePath}`;
  const absoluteJsFilePath = `${process.cwd()}/${dirPath}/${baseName}.js`;

  return {
    absCsPath: absoluteCoffeePath,
    absJsPath: absoluteJsFilePath
  }
}
