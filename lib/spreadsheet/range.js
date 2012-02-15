
function Range(cells) {

  var cells_ = [];
  var cellKeys_ = [];
  var cellCoords_ = [];

  function init(cells) {
    cells_ = cells;
  }

  function dump() {
    console.log(cellKeys_);
    for (key in cells_) {
      console.log('[' + key + ']' + ' = ' + cells_[key].getProperty('content'));
    }
  }
 
  init(cells);
  return {
    cells: cells_,
    dump: dump,
    activate: function() {},
    breakApart: function() {},
    clear: function() {},
    clearComment: function() {},
    clearContent: function() {},
    clearFormat: function() {},
    copyFormatToRange: function() {},
    copyTo: function() {},
    copyValuesToRange: function() {},
    getA1Notation: function() {},
    getBackgroundColor: function() {},
    getBackgroundColors: function() {},
    getCell: function() {},
    getColumn: function() {},
    getColumnIndex: function() {},
    getComment: function() {},
    getComments: function() {},
    getFontColor: function() {},
    getFontColors: function() {},
    getFontFamilies: function() {},
    getFontFamily: function() {},
    getFontLine: function() {},
    getFontLines: function() {},
    getFontSize: function() {},
    getFontSizes: function() {},
    getFontStyle: function() {},
    getFontStyles: function() {},
    getFontWeight: function() {},
    getFontWeights: function() {},
    getFormula: function() {},
    getFormulaR1C1: function() {},
    getFormulas: function() {},
    getFormulasR1C1: function() {},
    getHeight: function() {},
    getHorizontalAlignment: function() {},
    getHorizontalAlignments: function() {},
    getLastColumn: function() {},
    getLastRow: function() {},
    getNumberFormat: function() {},
    getNumberFormats: function() {},
    getNumColumns: function() {},
    getNumRows: function() {},
    getRow: function() {},
    getRowIndex: function() {},
    getSheet: function() {},

    /**
     * Gets the value of the top left cell in a range. Returns an empty string
     * if the top left cell is empty.
     */
    getValue: function() {
      return cells_[0][0].getProperty('content');
    },

    /**
     * Gets the values of all cells in a given range. 
     * 
     * Returns a JavaScript 2d array with all the values, indexed by row then by
     * column. Each item of the array may be of one of the following types:
     * Boolean, int, String or Date. Cells that are empty will be represented by
     * an empty string in the array. Remember that while a range index starts at
     * 1,1, the JavaScript array will be indexed from 0,0.
     */
    getValues: function() {
      var retval = [], i;
      for (var r = 0; r < cells_.length; r++) {
        retval.push([]);
        for (var c = 0; c < cells_[0].length; c++) {
          retval[r].push([]);
          retval[r][c] = cells_[r][c].getProperty('content');
        }
      }
      return retval;
    },

    getVerticalAlignment: function() {},
    getVerticalAlignments: function() {},
    getWidth: function() {},
    getWrap: function() {},
    getWraps: function() {},
    mergeAcross: function() {},
    moveTo: function() {},
    offset: function() {},
    setBackgroundColor: function() {},
    setBackgroundColors: function() {},
    setBackgroundRGB: function() {},
    setBorder: function() {},
    setComment: function() {},
    setComments: function() {},
    setFontColor: function() {},
    setFontColors: function() {},
    setFontFamilies: function() {},
    setFontFamily: function() {},
    setFontLine: function() {},
    setFontLines: function() {},
    setFontSize: function() {},
    setFontSizes: function() {},
    setFontStyle: function() {},
    setFontStyles: function() {},
    setFontWeight: function() {},
    setFontWeights: function() {},
    setFormula: function() {},
    setFormulaR1C1: function() {},
    setFormulas: function() {},
    setFormulasR1C1: function() {},
    setHorizontalAlignment: function() {},
    setHorizontalAlignments: function() {},
    setNumberFormat: function() {},
    setNumberFormats: function() {},
    setValue: function() {},
    setValues: function() {},
    setVerticalAlignment: function() {},
    setVerticalAlignments: function() {},
    setWrap: function() {},
    setWraps: function() {},
    sort: function() {}

  };
};
