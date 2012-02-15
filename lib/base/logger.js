
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




