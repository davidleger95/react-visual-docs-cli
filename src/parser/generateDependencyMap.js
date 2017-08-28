module.exports = function generateDependencyMap (docs) {
  let dependencyMap = [];
  for (let file in docs) {
    if (docs.hasOwnProperty(file)) {
      docs[file].dependencies.map(dependency => {
        dependencyMap.push({
          source: docs[file].filePath,
          target: dependency.path,
          sourceType: docs[file].moduleType,
          targetType: docs.hasOwnProperty(dependency.path) ?
            docs[dependency.path].moduleType : dependency.moduleType || 'css',
          sourceDisplayName: docs[file].displayName
        });
      });
    }
  }

  return dependencyMap;
};
