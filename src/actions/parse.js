import fs from 'fs';
import {
  logGeneratingFrom,
  initSpinner,
  logSuccess
} from '../utils/cli-messages';
import {
  generateDocumentation,
  generateMetaData,
  generateDependencyMap
} from '../parser';

const dirDoesNotExist = dir => !fs.existsSync(dir);
const makeDir = dir => fs.mkdirSync(dir);

export default function parse(dir = 'src') {
  // User feedback
  logGeneratingFrom(dir);

  const spinner = initSpinner();
  spinner.start();

  // Generate docs
  const modulesData = generateDocumentation({ dir });
  const metaData = generateMetaData({ dir });
  const dependencyMap = generateDependencyMap(modulesData);

  const docs = {
    meta: metaData,
    docs: modulesData,
    dependencyMap
  }
  // Ensure output directory exists
  const outDir = './docs';
  if (dirDoesNotExist(outDir)) makeDir(outDir);

  // Write output to file
  const outPath = `${outDir}/visual-docs-data.json`;
  fs.writeFile(
    outPath,
    JSON.stringify(docs, null, 2),
    err => {
      spinner.stop();
      if (err) logError(err);
      logSuccess(outPath);
  });
};
