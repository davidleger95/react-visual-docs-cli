#!/usr/bin/env node
import cli from 'commander';
import {
  parse
} from './actions';

cli
  .version('0.1.0');

cli
  .command('parse [dir]')
  .description('Parse project')
  .action(parse);
cli.parse(process.argv);
