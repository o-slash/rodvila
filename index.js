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

  let doc = officegen(command.outputFormat);
  let out = fs.createWriteStream(command.outputFile);

  readFile(command.args[0])
    .then(content => lexer.lex(content))
    .catch(err => console.error(err))
    .then(tokens => tokens.forEach(elem => {
      switch (elem.type) {
        case 'heading':
          {
            let pObj = doc.createP();
            pObj.addText(elem.text, {
              bold: true,
              font_face: 'Arial',
              font_size: 40
            });
          }
          break;
        default:
          {
            let pObj = doc.createP();
            pObj.addText(elem.text);
          }
          break;
      }
    }))
    .then(response => doc.generate(out));

};