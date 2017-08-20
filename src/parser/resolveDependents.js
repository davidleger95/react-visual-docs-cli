const _ = require('lodash');

const isMatchingFilePath = (curr, key) => {
  //console.log(a, b);
  return curr === key
    || `/${curr}` === `${key}`
    || `/${curr}` === `${key}.js`
    || `/${curr}` === `${key}.jsx`;
}

export default function resolveDependents(docs) {
  let dependencyMap = [];
  for (let file in docs) {
    if (docs.hasOwnProperty(file)) {
      docs[file].dependants = [];
      docs[file].dependencies.forEach(dependency => {
        if (dependency.moduleType !== 'nodeModule') {
          const dependant = _.find(docs, o => isMatchingFilePath(o.filePath, dependency.path));
          console.log(dependency, dependant, file, '\n\n\n');
          if (dependant) {
            if (!docs[dependant.filePath].dependants) docs[dependant.filePath].dependants = [];
            docs[dependant.filePath].dependants = [
              ...docs[dependant.filePath].dependants,
              {
                path: docs[file].filePath,
                name: docs[file].displayName || docs[file].filePath,
                moduleType: docs[file].moduleType
              }
            ];
          }
        }
      });
    }
  }
  return docs;
}

export function resolveDependents2 (docs) {
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
