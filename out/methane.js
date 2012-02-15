
var Logger = (function() {
  var log_ = [];
  
  return {
    getLog: function() { 
      return log_.join('\n'); 
    },

    log: function(message) { 
      log_.push(message); 
    }

  };
})();





var Browser = (function() {
  return {
    Buttons: function() { return Buttons; },
    inputBox: function(title, prompt, buttons) { return 0; },
    msgBox: function(title, prompt, buttons) { return 0; }
  };
})();
var Buttons = (function() {
  return {
    OK: function() { return 0; },
    OK_CANCEL: function() { return 1; },
    YES_NO: function() { return 2; },
    YES_NO_CANCEL: function() { return 3; }
  };
})();
/**
 * Base 26
 * where A = 1
 */

// Number.prototype.toBase26 = function() {
//   return Base26.toBase26(this);
// }

// String.prototype.toRC = function() {
//   return Base26.toRC(this);
// }

var Base26 = (function() {

  return {

    /**
     * Converts an integer into base 26
     */
    toBase26: function(input) {
      input = (+input-1).toString(26);
      var ret = [];
      while (input.length) {
        var a = input.charCodeAt(input.length-1);
        if (input.length > 1) {
          input = (parseInt(input.substr(0, input.length - 1), 26) - 1).toString(26);
        } else {
          input = "";
        }
        if (a >= 48/*'0'*/ && a <= 57 /*'9'*/) {
          ret.unshift(String.fromCharCode(a + 49)); //raise to += 'a'
        } else {
          ret.unshift(String.fromCharCode(a + 10)); //raise + 10 (make room for 0-9)
        }
      }
      return ret.join('').toUpperCase();
    },

    /**
     * Convert base 26 to an integer
     */
    toInt: function(l) {
      var ret = 0;
      l = l.toUpperCase();
      if (l.length > 1) {
        ret = l[0].charCodeAt() - 65 + 26;
        ret = ret + l[1].charCodeAt() - 65;
      } else {
        ret = l.charCodeAt() - 65;
      }
      ret++; // Columns start at 1.
      return ret;
    },

    /**
     * Returns A1 => 1, 1
     */
    toRC: function(base) {
      var baseMatch = base.match(/([A-Z])(\d+)/);
      if (baseMatch == null) { 
        // only a letter
        return { r: false, c: this.toInt(base) };  
      } else {
        // letter and a number
        var col = baseMatch[1];
        var row = parseInt(baseMatch[2]);
        return { r: row, c: this.toInt(col) };
      }
    },

    /**
     * Returns start and end r/c
     */
    range: function(range) {
      var baseMatch = range.match(/([A-Z]\d?)(:)([A-Z]\d?)/);
      var start = baseMatch[1];
      var end = baseMatch[3];
      return {
        'start' : Base26.toRC(start),
        'end'   : Base26.toRC(end)
      }
    }

  }

})();
/**
 * Class Cell
 */
function Cell(properties) {
  var properties_ = [];

  var defaultProperties_ = {
    'content' : '',
    'comment' : ''
  };

  function init(properties) {
    properties = properties || defaultProperties_;
    for (property in properties) {
      setProperty(property, properties[property]);
    }
  }

  function setProperty(property, value) {
    properties_[property] = value;
    return properties_[property];
  }

  function getProperty(property) {
    return properties_[property];
  }

  function dump(key) {
    key = key || '';
    for (property in properties_) {
      console.log(key + ' [' + property + '] = ' + properties_[property]);
    }
  }

  init(properties);
  return {
    properties: properties_,
    setProperty: setProperty,
    getProperty: getProperty,
    dump: dump
  };

}

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
/**
 * Class Worksheet
 */
function Sheet(name) {

  var cells_ = [],
      name_,
      lastCol_ = 0,
      lastRow_ = 0;

  function init(name) {
    setName(name);
  }

  function setName(name) {
    name = name || '';
    name_ = name;
  }

  /**
   * Returns the index of a row, column pair
   */
  function indexOf(r, c) {
    return Base26.toBase26(c) + r.toString();
  }

  /**
   * Sets the value of a cell (note: clobbers whatever was there before)
   * @param {int} r Row
   * @param {int} c Col
   * @param {cell} properties Cell properties
   */
  function setValue(r, c, properties) {
    var cell = new Cell(properties);
    cells_[indexOf(r, c)] = cell;
    if (r > lastRow_) { lastRow_ = r; }
    if (c > lastCol_) { lastCol_ = c; }
  }

  /**
   * Gets a value of a cell
   * @param  {int} r Row
   * @param  {int} c Col
   * @return {mixed}
   */
  function getValue(r, c) {
    if (r < 1) { throw 'Row specified must be > 0'; }
    if (c < 1) { throw 'Col specified must be > 0'; }
    var cell;
    if (typeof(r) === 'number') { 
      cell = cells_[indexOf(r, c)];
    } else {
      cell = cells_[r];
    }
    return (cell === undefined) ? null : cell.getProperty('content'); 
  }

  /**
   * Gets the content from cells
   */
  function getValues(startR, startC, endR, endC) {
    var retval = [];
    for (var r = startR; r <= endR; r++) {
      for (var c = startC; c <= endC; c++) {
        retval.push(getValue(r, c));
      }
    }  
    return retval;
  }

  /**
   * Returns one cell
   */
  function getCell(r, c) {
    return cells_[indexOf(r, c)];
  }

  /**
   * Returns a range of cells.  Empty cells are included with empty strings
   */
  function getCells(startR, startC, endR, endC) {
    var retval = [], i;  
    for (var r = startR; r <= endR; r++) {
      retval.push([]);
      for (var c = startC; c <= endC; c++) {
        retval[r-startR].push([]);
        i = indexOf(r, c);
        retval[r - startR][c - startC] = (cells_[i] != undefined)
            ? cells_[indexOf(r, c)]
            : new Cell();
      }
    }
    return retval;
  }

  /**
   * Returns all the coordinates of cells
   */
  function cellKeys() {
    var keys = [];
    for (var key in cells_) { keys.push(key); }
    return keys;
  }

  /**
   * Outputs all the cells to the console
   */
  function dump() {
    var keys = cellKeys().sort();
    console.log(keys);
    for (var key in keys) {
      console.log('  ws -> [' + keys[key] + '] = ' + 
                 cells_[keys[key]].getProperty('content'));
    }
  }

  /**
   * Performs a block over all the cells
   * The block must take (key, cell) as arguments.
   * key == the A1 notation coords
   * cell == an instance of Cell class
   */
  function allCells_(block) {
    for (var key in cells_) { block(key, cells_[key]); }
  }

  init(name);
  return {
    cells: cells_,
    dump: dump,
    cellKeys: cellKeys,
    indexOf: indexOf,
    getValue: getValue,
    getValues: getValues,
    setValue: setValue,
    getCell: getCell,
    getCells: getCells,

    clear: function() { cells_ = []; },

    clearComments: function() { 
      allCells_(function(key, cell) { 
        cell.setProperty('comment', '');
      })
    },

    clearContents: function() {
      allCells_(function(key, cell) { 
        cell.setProperty('content', '');
      })      
    },

    clearFormats: function() {},
    copyTo: function() {},
    deleteColumn: function() {}, // erase col, move evreything over by one
    deleteColumns: function() {},
    deleteRow: function() {},
    deleteRows: function() {},
    getActiveCell: function() {},
    getActiveSelection: function() {},
    getColumnWidth: function() {},
    getDataRange: function() {},
    getFrozenColumns: function() {},
    getFrozenRows: function() {},
    getIndex: function() {},
    getLastColumn: function() {},
    getLastRow: function() {},
    getMaxColumns: function() {},
    getMaxRows: function() {},

    getName: function() { return name_; },

    getParent: function() {},

    getRange: function() {
      if (arguments.length === 0) { throw 'getRange received no arguments'; }
        
      if (typeof(arguments[0]) === 'string') {
        
        var rc = Base26.range(arguments[0]);
        var row = rc.start.r || lastRow_;
        var col = rc.start.c || lastCol_;

        console.log('rc = ' + row + ', ' + col);
        
        var optNumRows = arguments[1] || 0;
        var optNumCols = arguments[2] || 0;

      } else if (typeof(arguments[0]) === 'number') {
        if (arguments[1] === undefined) { 
          throw 'getRange received row but no column in the arguments';
        }
        var row = arguments[0];
        var col = arguments[1];
        var optNumRows = arguments[2] || 0;
        var optNumCols = arguments[3] || 0;
      }

      if (row < 1 || col < 1) { throw 'getRange received row or col < 0'}
      return new Range(getCells(row, col, row + optNumRows, col + optNumCols));
    },

    getRowHeight: function() {},
    hideColumn: function() {},
    hideColumns: function() {},
    hideRow: function() {},
    hideRows: function() {},
    insertColumnAfter: function() {},
    insertColumnBefore: function() {},
    insertColumns: function() {},
    insertColumnsAfter: function() {},
    insertColumnsBefore: function() {},
    insertImage: function() {},
    insertImage: function() {},
    insertRowAfter: function() {},
    insertRowBefore: function() {},
    insertRows: function() {},
    insertRowsAfter: function() {},
    insertRowsBefore: function() {},
    setActiveCell: function() {},
    setActiveCell: function() {},
    setActiveSelection: function() {},
    setActiveSelection: function() {},
    setColumnWidth: function() {},
    setFrozenColumns: function() {},
    setFrozenRows: function() {},

    setName: function(name) { name_ = name || ''; },

    setRowHeight: function() {},
    showColumns: function() {},
    showRows: function() {},
    sort: function() {},
    sort: function() {},
    unhideColumn: function() {},
    unhideRow: function() {},
    getActiveRange: function() {}
  };

}
/**
 * Spreadsheet
 */
function Spreadsheet() { // TODO incomplete

  var DEFAULT_PREFIX = 'Sheet',
      sheets_ = [],
      sheetCount_ = 0,
      activeSheet_;
  
  function init() {
    activeSheet_ = makeNewSheet_();
  }

  function makeNewSheet_(optName) {
    sheetCount_++;    
    var sheetName = (optName === undefined) ? 
                    DEFAULT_PREFIX + sheetCount_ : 
                    sheetName = optName;
    sheets_[sheetName] = new Sheet(sheetName);
    return sheetName;
  }

  function dump_() {
    console.log(sheets_);
  }

  function dumpSheetNames_() {
    var temp = [];
    for (sheet in sheets_) { temp.push(sheet); } 
    console.log(temp);
  }

  init();

  //--------------------------------------------------------------------------
  
  return {
    dump: dump_,
    dumpSheetNames: dumpSheetNames_,
    sheets_: sheets_,

    getActiveRange: function() {},
    addCollaborator: function() {},
    addCollaborator: function() {},
    addCollaborators: function() {},
    addViewer: function() {},
    addViewer: function() {},
    addMenu: function() {},
    removeMenu: function() {},
    deleteActiveSheet: function() {},
    duplicateActiveSheet: function() {},

    getActiveSheet: function() {
      return sheets_[activeSheet_];
    },

    getCollaborators: function() {},
    getColumnWidth: function() {},
    getFormUrl: function() {},
    getId: function() {},
    getName: function() {},
    getNumSheets: function() {},
    getOwner: function() {},
    getRangeByName: function() {},
    getRowHeight: function() {},

    getSheetByName: function(name) {
      if (sheets_[name] === undefined) { 
        throw 'Sheet '+name+' does not exist.';
      }
      return sheets_[name];
    },

    getSheets: function() {},
    getSpreadsheetLocale: function() {},
    getSpreadsheetTimeZone: function() {},
    getUrl: function() {},
    getViewers: function() {},

    insertSheet: function(optName, optSheetIndex, optAdvancedArgs) {
      makeNewSheet_(optName);
    },

    isAnonymousView: function() {},
    isAnonymousWrite: function() {},
    isReadable: function() {},
    isWritable: function() {},
    moveActiveSheet: function() {},
    removeCollaborator: function() {},
    removeCollaborator: function() {},
    removeViewer: function() {},
    removeViewer: function() {},
    rename: function() {},
    renameActiveSheet: function() {},

    setActiveSheet: function(sheet) {
      // todo if sheet ! in sheets_ throw error
      activeSheet_ = sheet;
    },

    setAnonymousAccess: function() {},
    setColumnWidth: function() {},
    setName: function() {},
    setNamedRange: function() {},
    removeNamedRange: function() {},
    setRowHeight: function() {},
    setSpreadsheetLocale: function() {},
    setSpreadsheetTimeZone: function() {},
    show: function() {},
    toast: function() {}

  };
}
var SpreadsheetApp = (function() {

  var activeSpreadsheet_ = new Spreadsheet();

  return {
    getActiveRange: function() { return Range; },
    create: function() { return Spreadsheet; },
    flush: function() {},

    getActiveSheet: function() { 
      return activeSpreadsheet_.getActiveSheet(); 
    },

    getActiveSpreadsheet: function() { 
      return activeSpreadsheet_;
    },
    
    openById: function(id) { return 0; },

    setActiveRange: function(range) {return Range; },

    setActiveSheet: function(sheet) {
      return activeSpreadsheet_.setActiveSheet(sheet); 
    },

    setActiveSpreadsheet: function(spreadsheet) { 
      return Spreadsheet; 
    }

  };
})();

var HTTPResponse = (function() {
  return {
    getContent: function() { return 0; },        // Byte []
    getContentText: function() { return 0; },
    getHeaders: function() { return 0; },        // Key/value map of HTTP headers
    getResponseCode: function() { return 0; }    // int
  };
})();

var OAuthConfig = (function() {
  return {
    setAccessTokenUrl: function() { return ''; },
    setAuthorizationUrl: function() { return ''; },
    setAuthorizationUrl: function() { return ''; },
    setConsumerSecret: function() { return ''; }
  };
})();

var UrlFetchApp = (function() {
  return {
    // TODO addOAuthService
    fetch: function(url, optAdvancedArgs) { return HTTPResponse; }
  };
})();var MacAlgorithm = (function() {
  return {
    HMAC_MD5: function() { return 0; },
    HMAC_SHA_1: function() { return 0; },
    HMAC_SHA_256: function() { return 0; },
    HMAC_SHA_384: function() { return 0; },
    HMAC_SHA_512: function() { return 0; }
  };
})();var Utilities = (function() {
  return {
    base64Decode: function(data) {},
    base64Encode: function(data) {},
    computeDigest: function(digestAlgorithm, value) {},
    computeHmacSignature: function(macAlgorithm, value, key) {},
    computeHmacSha256Signature: function(value, key) {},
    formatDate: function(date, timeZone, format) {},
    jsonParse: function(jsonString) { return jQuery.parseJSON(jsonString); },
    jsonStringify: function(object) { return JSON.stringify(object); },
    newBlob: function(data, contentType, name) {},
    sleep: function(milliseconds) {},
    MacAlgorithm: function() { return MacAlgorithm; }
  };
})();
var Xml = (function() {
  return {
    parse: function(xmlContent, optLenient) { return jQuery.parseXML(xmlContent); },
    parseJS: function(shortHand) {}
  };
})();

var XmlElement = (function() {
  return {
    getAttribute: function(attributeName) { return 0; },
    getDocument: function() { return Xml(xmlContent); },
    getElement: function(elementName) { return XmlElement(xmlObj.find(elementName).first()); },
    getElements: function(elementName) { return XmlElement(xmlObj.find(elementName)); },
    getName: function() { return 0; },
    getText: function() {return this.text(); },
    toXmlString: function() { return 0; }
  };
})();
