'use strict';

const OfficegenRenderer = require('./officegen-renderer.js');

class PptxRenderer extends OfficegenRenderer {
  /**
   * Markdown renderer for PPTX documents
   * @param {Object} doc - Officegen document object
   * @param {Object} [opts] - Styles options
   */
  constructor(doc, opts) {
    super(doc, opts);

    this.opts = opts || {};
  }
}

module.exports = PptxRenderer;