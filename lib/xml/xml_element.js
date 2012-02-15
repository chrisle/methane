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
