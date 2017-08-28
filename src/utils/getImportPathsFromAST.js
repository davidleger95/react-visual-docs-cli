import path from 'path';
import _ from 'lodash';

// TODO cleanup
// TODO resolve imports from implicitly referenced index.js files.
// TODO resolve referential exports: `export Component from './Component';`.

export default function getImportPathsFromAST(ast, rootPath) {
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
