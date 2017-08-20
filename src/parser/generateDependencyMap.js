module.exports = function generateDependencyMap (docs) {
  let dependencyMap = [];
  for (let file in docs) {
    if (docs.hasOwnProperty(file)) {
      docs[file].dependencies.map(dependency => {
        dependencyMap.push({
          source: docs[file].filePath,
          target: dependency.path,
          sourceType: docs[file].moduleType,
          //TODO devlop more robust solution for matching key.
          targetType: docs.hasOwnProperty(`${dependency.path.slice(1)}.js`) ?
            docs[`${dependency.path.slice(1)}.js`].moduleType : dependency.moduleType || 'css',
          sourceDisplayName: docs[file].displayName
        });
      });
    }
  }

  return dependencyMap;
};
