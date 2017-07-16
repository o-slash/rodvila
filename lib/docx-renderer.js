'use strict';

const OfficegenRenderer = require('./officegen-renderer.js');

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
        font_size: 18
      },
      'heading-2': {
        bold: true,
        font_face: 'Arial',
        font_size: 16
      },
      'heading-3': {
        bold: true,
        font_face: 'Arial',
        font_size: 14
      },
      'code': {
        font_face: 'Courier New',
        font_size: 10
      },
      'default': {
        font_face: 'Arial',
        font_size: 12
      },
      'blockquote': {
        font_face: 'Arial',
        font_size: 12,
        italic: true,
        align: 'center'        
      }
    };

    this.listItems = [];
    this.blocks = [];
  }

  /**
   * Render hr markdown element
   * @param {Object} elem - Marked.js element object
   */
  hr(elem) {
    let pObj = this.doc.createP();
    pObj.addHorizontalLine();
  }

  /**
   * Render heading markdown element
   * @param {Object} elem - Marked.js element object
   */
  heading(elem) {
    let style = this.opts['heading-' + elem.depth] || this.opts['default'] || {};
    let pObj = this.doc.createP();

    pObj.addText(elem.text, style);
  }

  /**
   * Render paragraph markdown element
   * @param {Object} elem - Marked.js element object
   */
  paragraph(elem) {
    let block = this.blocks.slice(-1)[0];
    let style = this.opts.paragraph || this.opts['default'] || {};
    if (block && block.type === 'blockquote') {
      style = this.opts.blockquote || this.opts.default || {};
    }
    let pObj = this.doc.createP();

    pObj.addText(elem.text, style);
  }

  /**
   * Render code markdown element
   * @param {Object} elem - Marked.js element object
   */
  code(elem) {
    let style = this.opts.code || this.opts['default'] || {};
    let pObj = this.listItems.lenght > 0 && this.listItems.slice(-1)[0];
    if (!pObj) {
      pObj = this.doc.createP();
    }

    pObj.addText(elem.text, style);
  }

  /**
   * Open list
   * @param {Object} elem - Marked.js element object
   */
  list_start(elem) {
    this.blocks.push({type: 'list', ordered: elem.ordered});
  }

  /**
   * Close list
   * @param {Object} elem - Marked.js element object
   */
  list_end(elem) {
    this.blocks.pop();
  }

  /**
   * Open blockquote
   * @param {Object} elem - Marked.js element object
   */
  blockquote_start(elem) {
    this.blocks.push({type:'blockquote'});
  }

  /**
   * Close blockquote
   * @param {Object} elem - Marked.js element object
   */
  blockquote_end(elem) {
    this.blocks.pop();
  }

  /**
   * Open list item
   * @param {Object} elem - Marked.js element object
   */
  list_item_start(elem) {
    let block = this.blocks.slice(-1)[0];
    if (block.ordered) {
      let pObj = this.doc.createListOfNumbers();
      return this.listItems.push(pObj);
    }

    let pObj = this.doc.createListOfDots();
    this.listItems.push(pObj);
  }

  /**
   * Open loose list item
   * @param {Object} elem - Marked.js element object
   */
  loose_item_start(elem) {
    this.list_item_start(elem);
  }

  /**
   * Close list item
   * @param {Object} elem - Marked.js element object
   */
  list_item_end(elem) {
    this.listItems.pop();
  }

  /**
   * Render text markdown element
   * @param {Object} elem - Marked.js element object
   */
  text(elem) {
    let pObj = this.listItems.length > 0 && this.listItems.slice(-1)[0];
    if (!pObj) {
      pObj = this.doc.createP();
    }

    pObj.addText(elem.text, this.opts.text || this.opts['default'] || {});
  }

  /**
   * Render space markdown element
   * @param {Object} elem - Marked.js element object
   */
  space(elem) {
    let pObj = this.listItems.length > 0 && this.listItems.slice(-1)[0];
    if (!pObj) {
      pObj = this.doc.createP();
    }

    pObj.addText(' ', this.opts.text || this.opts['default'] || {});
  }
}

module.exports = DocxRenderer;