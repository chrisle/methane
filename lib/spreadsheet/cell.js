/**
 * Class Cell
 */
function Cell(properties) {
  var properties_ = [];

  var defaultProperties_ = {
    'content' : '',
    'comment' : ''
  };

  function init(properties) {
    properties = properties || defaultProperties_;
    for (property in properties) {
      setProperty(property, properties[property]);
    }
  }

  function setProperty(property, value) {
    properties_[property] = value;
    return properties_[property];
  }

  function getProperty(property) {
    return properties_[property];
  }

  function dump(key) {
    key = key || '';
    for (property in properties_) {
      console.log(key + ' [' + property + '] = ' + properties_[property]);
    }
  }

  init(properties);
  return {
    properties: properties_,
    setProperty: setProperty,
    getProperty: getProperty,
    dump: dump
  };

}
