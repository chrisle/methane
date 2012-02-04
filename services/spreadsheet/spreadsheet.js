/**
 * Spreadsheet
 */
var Spreadsheet = (function() { // TODO incomplete

  var DEFAULT_PREFIX = 'Sheet',
      sheets_ = [],
      sheetCount_ = 0,
      activeSpreadsheet_;
  
  function constructor() {
    activeSpreadsheet_ = makeSheet();
  }

  function makeSheet(optName) {
    sheetCount_++;    
    var sheetName = (optName === undefined) ? 
                    DEFAULT_PREFIX + sheetCount_ : 
                    sheetName = optName;
    sheets_[sheetName] = Sheet;
    return sheetName;
  }

  function dump() {
    console.log(sheets_);
  }

  constructor();
  return {
    
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
    getActiveSheet: function() {},
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
      return sheets_[name];
    },

    getSheets: function() {},
    getSpreadsheetLocale: function() {},
    getSpreadsheetTimeZone: function() {},
    getUrl: function() {},
    getViewers: function() {},

    insertSheet: function(optName, optSheetIndex, optAdvancedArgs) {
      makeSheet(optName);
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
      activeSpreadsheet_ = sheet;
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
})();
