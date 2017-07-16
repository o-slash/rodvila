'use strict';
/**
 * Parse command line arguments
 * @param {string[]} argv - An array of command line arguments.
 * @returns {Command} - The parsed command line object.
 */
var parseCli = module.exports.parseCli = function (argv) {
  let version = require('./package.json').version;
  let Command = require('commander').Command;
  
  let command = new Command()
    .version(version)
    .arguments('<SOURCE> [OTHERS...]')
    .option('-o, --output-file [FILE]', 'Set output file', /^.*\.(docx|pptx)$/i, 'stdout')
    .option('-f, --output-format [TYPE]', 'Set output file format [docx|pptx]', 'docx')
    .parse(argv);

  return command;
};

/**
 * Generate documents
 * @param {Command} command - The command line object.
 */
var generate = module.exports.generate = function (command) {
  const markdown = require('markdown-it');
  const officegen = require('officegen');

  console.log('Sources:', command.args.join(', '));
  console.log('Output file:', command.outputFile);
  console.log('Output format:', command.outputFormat);
};