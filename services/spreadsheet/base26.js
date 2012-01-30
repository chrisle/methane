/**
 * Base 26
 * where A = 1
 */

Number.prototype.toBase26 = function() {
  return Base26.toBase26(this);
}

String.prototype.toRC = function() {
  return Base26.toRC(this);
}

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
     * Convert base 26 to row
     */
    base26ToRow: function(base) {
      return parseInt(base.match(/\d+/).join(''));
    },

    /**
     * Convert base 26 to column
     */
    base26ToCol: function(base) {
      return this.base26ToInt(base.match(/[A-Z]/g).join('').toString()) + 1;
    },

    /**
     * Convert base 26 to an integer
     */
    base26ToInt: function(l) {
      var ret = 0;
      l = l.toUpperCase();
      if (l.length > 1) {
        ret = l[0].charCodeAt() - 65 + 26;
        ret = ret + l[1].charCodeAt() - 65;
      } else {
        ret = l.charCodeAt() - 65;
      }
      return ret;
    },

    toRC: function(base) {
      return { r: this.base26ToRow(base), c: this.base26ToCol(base) };
    }
  }

})();
