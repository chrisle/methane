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
