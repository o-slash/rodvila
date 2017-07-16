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
  const fs = require('fs');
  const marked = require('marked');
  const officegen = require('officegen');

  const readFile = filename => new Promise((resolve, reject) => fs.readFile(filename, 'utf-8', (err, data) => (err) ? reject(err) : resolve(data)));

  const options = {
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false
  };
  const lexer = new marked.Lexer(options);

  readFile(command.args[0])
    .then(content => lexer.lex(content))
    .then(tokens => {
      let Renderer;
      let format;

      switch (command.outputFormat) {
        case 'pptx':
          format = 'pptx';
          Renderer = require('./lib/pptx-renderer.js');
          break;

        default:
          format = 'docx';
          Renderer = require('./lib/docx-renderer.js');
      }

      let doc = officegen(format);
      let renderer = new Renderer(doc);

      tokens.forEach(elem => {
        renderer.render(elem);
      });

      return doc;
    })
    .then(doc => {
      let out = fs.createWriteStream(command.outputFile);
      doc.generate(out);
    })
    .catch(err => console.error(err));

};