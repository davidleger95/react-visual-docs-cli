import fs from 'fs-sync';
import glob from 'glob';
var reactDocs = require('react-docgen');
import getAST from '../utils/getAST';
import getImportPathsFromAST from '../utils/getImportPathsFromAST';
import refactorImportPaths from '../utils/refactorImportPaths';
import { resolveDependents2 } from './resolveDependents';

let regeneratorRuntime = require("regenerator-runtime");

const getSourceFilePaths = (dir, ignore) => glob.sync("**/*.js", {
  root: dir,
  ignore: ignore || ['node_modules/**', '**/*.test.js']
});



export default function generateDocumentation({ dir, ignore }) {
  let docs = {};
  const files = getSourceFilePaths(dir, ignore);

  const parseFile = (file, i) => {
    let componentInfo = {};
    const data = fs.read(file);
    const ast = getAST(data);
    const dependencies = refactorImportPaths(getImportPathsFromAST(ast, file));
    try {
      componentInfo = {
        moduleType: 'reactComponent',
        ...reactDocs.parse(data),
      };

    } catch (err) {
      componentInfo = {
        moduleType: 'js'
      }
    }
    docs[file] = {
      filePath: file,
      ...componentInfo,
      dependencies
    };
  };

  files.forEach(parseFile);
  const newDocs = resolveDependents2(docs);

  return newDocs;
}
