'use strict';

class OfficegenRenderer {
  /**
   * Markdown renderer for DOCX Ddcuments
   * @param {Object} doc - Officegen document object
   * @param {Object} [opts] - Styles options
   */
  constructor(doc, opts) {
    this.doc = doc;

    this.opts = opts;
  }

  render(elem) {
    if (this[elem.type] instanceof Function) {
      this[elem.type](elem);
      return;
    }
  }

}

module.exports = OfficegenRenderer;