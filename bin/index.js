#!/usr/bin/env node
const program = require('commander');
const colors = require('ansicolors');

const dir = process.cwd();

const redCross = colors.red('✗');
const greenCheck = colors.green('✓');
const cyan = colors.cyan;

program
  .arguments('init')
  .action(() => {
    const init = require('./init');
    init(dir);
  })
  .parse(process.argv);

program
  .arguments('generate')
  .action(() => {
    const generate = require('./generate');
    generate(dir);
  })
  .parse(process.argv);
