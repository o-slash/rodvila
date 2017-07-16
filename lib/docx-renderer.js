'use strict';

const OfficegenRenderer = require('./officgen-renderer.js');

class DocxRenderer extends OfficegenRenderer {
  /**
   * Markdown renderer for DOCX Ddcuments
   * @param {Object} doc - Officegen document object
   * @param {Object} [opts] - Styles options
   */
  constructor(doc, opts) {
    super(doc, opts);

    this.opts = opts || {
      'heading-1': {
        bold: true,
        font_face: 'Arial',
        font_size: 40
      }
    };
  }
  /**
   * Render heading markdown element
   * @param {Object} elem - Marked.js element object
   */
  heading(elem) {
    let pObj = this.doc.createP();
    pObj.addText(elem.text, this.opts['heading-' + elem.depth] || {});
  }

  /**
   * Render paragraph markdown element
   * @param {Object} elem - Marked.js element object
   */
  paragraph(elem) {
    let pObj = this.doc.createP();
    pObj.addText(elem.text, this.opts.paragraph || {});
  }
}

module.exports = DocxRenderer;