#!/usr/bin/env node
const program = require('commander');
const colors = require('ansicolors');

const dir = process.cwd();

const redCross = colors.red('✗');
const greenCheck = colors.green('✓');
const cyan = colors.cyan;

program
  .command('init')
  .action(() => {
    const init = require('./init');
    init(dir);
  });

program
  .command('generate')
  .action(() => {
    const generate = require('./generate');
    generate(dir);
  });

program
  .command('new <title> [layout]')
  .action((title, layout) => {
    console.log(title, layout);
  });

program.parse(process.argv);
