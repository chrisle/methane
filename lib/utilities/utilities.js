var Utilities = (function() {
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