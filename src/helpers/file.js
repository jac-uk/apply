/**
 * Split a file path, eg /test1/test2/test3.png returns: ['/test1/test2', 'test3.png']
 * @param {String} filePath
 * @returns Array
 */
const splitFilePath = async (filePath) => {
  const splitPath = [];
  if (filePath) {
    // Find the last occurrence of the slash
    const lastSlashIndex = filePath.lastIndexOf('/');
    // Split the path
    const directoryPath = filePath.substring(0, lastSlashIndex);
    const fileName = filePath.substring(lastSlashIndex + 1);
    splitPath.push(directoryPath, fileName);
  }
  return splitPath;
};

export {
  splitFilePath
};
