var path = require('path');
var _ = require('lodash');

// TODO cleanup
module.exports = function getImportPathsFromAST(ast, rootPath) {
  const imports = _.filter(ast.body, { type: 'ImportDeclaration'}) || [];
  const absolutePaths = _.compact(imports.map(o => {
    const parsedPath = path.parse(o.source.value);
    const { dir, ext } = parsedPath;
    if (dir) {
      return (_.includes(['', '.js', '.jsx', '.es6', '.css'], ext)) ?
        path.resolve('/' + path.dirname(rootPath), o.source.value) : undefined;
    }
    return o.source.value;
  }));

  return absolutePaths;
}
