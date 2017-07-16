'use strict';

var parse = module.exports.parse = function (argvect) {
  const commander = require('commander');
  const version = require('./package.json').version;
  let sources;

  commander
    .version(version)
    .arguments('<source> [others...]')
    .option('-o, --output-file [file]', 'Set output file', /^.*\.(docx|pptx)$/i, 'stdout')
    .option('-f, --output-format [type]', 'Set output file format [docx|pptx]', /^(docx|pptx)$/i, 'docx')
    .action((source, others) => commander.sources = [source, ...others])
    .parse(argvect);

  return commander;
};

var generate = module.exports.generate = function (srcs, out, fmt) {
  const markdown = require('markdown-it');
  const officegen = require('officegen');

  console.log('Sources:', srcs.join(', '));
  console.log('Output file:', out);
  console.log('Output format:', fmt);
};