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
