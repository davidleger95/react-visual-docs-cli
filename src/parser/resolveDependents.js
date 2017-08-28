const _ = require('lodash');

const isMatchingFilePath = (curr, key) => {
  //console.log(a, b);
  return curr === key
    || `/${curr}` === `${key}`
    || `/${curr}` === `${key}.js`
    || `/${curr}` === `${key}.jsx`;
}

export default function resolveDependents2 (docs) {
  let resolvedDocs = {}
  for (let key in docs) {
    if (docs.hasOwnProperty(key)) {
      resolvedDocs = resolveDependenciesToDependants(docs, key);
    }
  }
  return resolvedDocs;
}

const resolveDependenciesToDependants = (docs, key) => {
  const currentItem = docs[key];
  currentItem.dependants = currentItem.dependants || [];
  let dependencyNode = null;

  currentItem.dependencies.forEach((dependency) => {
    const dependencyKey = findDependencyNode(docs, dependency.path);
    dependencyNode = docs[dependencyKey];
    if (dependencyNode) {
      dependency.path = dependencyKey;
      if (!dependencyNode.dependants) dependencyNode.dependants = [];
      dependencyNode.dependants = [
        ...dependencyNode.dependants,
        {
          name: currentItem.displayName || currentItem.filePath,
          path: currentItem.filePath,
          moduleType: currentItem.moduleType
        }
      ];
      docs = { ...docs, dependencyNode };
    }
  });
  return docs;
}

const findDependencyNode = (docs, path) => {
  for (let key in docs) {
    if (isMatchingFilePath(key, path) && docs.hasOwnProperty(key)) return key;
  }
}
