var SpreadsheetApp = (function() {

  return {
    getActiveRange: function() { return Range; },
    create: function() { return Spreadsheet; },
    flush: function() {},
    getActiveSheet: function() { return Sheet; },
    getActiveSpreadsheet: function() { return Spreadsheet; },
    openById: function(id) { return Spreadsheet; },
    setActiveRange: function(range) { return Range; },
    setActiveSheet: function(sheet) { return Sheet; },
    setActiveSpreadsheet: function(spreadsheet) { return Spreadsheet; }
  };
})();
