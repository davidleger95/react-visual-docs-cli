const path = require('path');

export default function refactorImportPaths(paths) {
  return paths.map(pathString => {
    const parsedPath = path.parse(pathString);
    const { dir, name } = parsedPath;
    if (!dir) {
      return {
        moduleType: 'nodeModule',
        name,
        path: pathString
      };
    }
    return {
      name,
      path: pathString
    }
  });
};
