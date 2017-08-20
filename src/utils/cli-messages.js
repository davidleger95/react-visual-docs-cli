import { bold } from 'chalk';
import { Spinner } from 'cli-spinner';

const { log } = console;

const logGeneratingFrom = dir =>
  log(bold.cyan(`Generating docs from '${dir}'...`));

const logSuccess = path => {
  log(bold.green(`\r \nSUCCESS!`));
  log(`\nOutput can be found at: ${bold.yellow(path)}\n`);
}
const logError = err =>
  log(bold.red(`ERROR! \n\n${err}`));

const initSpinner = () => new Spinner({
  text: '%s',
  spinnerString: '|/-\\'
});

export { logGeneratingFrom, logSuccess, logError, initSpinner };
