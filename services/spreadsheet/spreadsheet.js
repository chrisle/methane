/**
 * Spreadsheet
 */
var Spreadsheet = (function() { // TODO incomplete

  var DEFAULT_PREFIX = 'Sheet',
      sheets_ = [],
      sheetCount_ = 0,
      activeSpreadsheet_;
  
  function constructor() {}
    activeSpreadsheet_ = makeSheet();
  }

  function setActiveSheet (sheet) {
    activeSpreadsheet_ = sheet;
  }

  /**
   * Creates a new spreadsheet
   */
  function makeSheet(optName) {
    sheetCount_++;    
    var sheetName = (optName === undefined) ? 
                    DEFAULT_PREFIX + sheetCount_ : 
                    sheetName = optName;
    sheets_[sheetName] = Worksheet;
    return sheetName;
  }

  constructor();
  return {
    
    setActiveSheet: function(sheet) {
      activeSpreadsheet_ = sheet;
    },

    getActiveSheet: function() { 
      return sheets_[activeSpreadsheet_];
    },

    getSheetByName: function(name) { 
      return sheets_[name];
    },

    getRange: function(range) { 
      return Sheet(activeSpreadsheet_).getRange(range); 
    },

    create: function(optName) {
      return makeSheet(optName);
    },

    sheets_: sheets_

  };
})();
