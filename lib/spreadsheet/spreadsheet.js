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
