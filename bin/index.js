#!/usr/bin/env node
const program = require('commander');
const colors = require('ansicolors');

const dir = process.cwd();

const redCross = colors.red('✗');
const greenCheck = colors.green('✓');
const cyan = colors.cyan;

program
  .command('init')
  .description('initialize a blog project in the current directory')
  .action(() => {
    const init = require('./init');
    init(dir);
  });

program
  .command('generate')
  .description('generate blog for publishing')
  .action(() => {
    const generate = require('./generate');
    generate(dir);
  });

program
  .command('new <title> [layout]')
  .description('create new article')
  .action((title, layout) => {
    layout = (layout !== 'post' && layout !== 'draft') ? 'post' : layout;
    const create = require('./create');
    create(dir, title, layout);
  });

program
  .command('remove <path>')
  .description('remove article')
  .action(path => {
    const remove = require('./remove');
    remove(path, dir);
  });

program.parse(process.argv);
