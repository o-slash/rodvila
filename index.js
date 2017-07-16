'use strict';

/**
 * Parse command line arguments
 * @param {string[]} argv - An array of command line arguments.
 * @returns {Object} config - The configuration object.
 * @returns {string[]} config.sources - The source files.
 * @returns {string} config.outputFile - The output file.
 * @returns {string} config.outputFormat - The output file format (docx|pptx).
 */
var parse = module.exports.parseCli = function (argv) {
  const version = require('./package.json').version;
  const commander = require('commander');
  var sources;

  commander
    .version(version)
    .arguments('<source> [others...]')
    .option('-o, --output-file [file]', 'Set output file', /^.*\.(docx|pptx)$/i, 'stdout')
    .option('-f, --output-format [type]', 'Set output file format [docx|pptx]', /^(docx|pptx)$/i, 'docx')
    .action((source, others) => sources = [source, ...others])
    .parse(argv);

  return {
    sources: sources,
    outputFile: commander.outputFile,
    outputFormat: commander.outputFormat,
    parser: commander
  };
};

/**
 * Generate documents
 * @param {Object} config - The configuration object.
 * @param {string[]} config.sources - The source files.
 * @param {string} config.outputFile - The output file.
 * @param {string} config.outputFormat - The output file format (docx|pptx).
 */
var generate = module.exports.generate = function (config) {
  const markdown = require('markdown-it');
  const officegen = require('officegen');

  console.log('Sources:', config.sources.join(', '));
  console.log('Output file:', config.outputFile);
  console.log('Output format:', config.outputFormat);
};