
// @codekit-append "services/base.js"
// @codekit-append "services/spreadsheet.js"
// @codekit-append "services/url_fetch.js"


/*********************************************** 
     Begin base.js 
***********************************************/ 


test('Logger', function() {
  Logger.log('hello world');
  Logger.log('second log');
  Logger.log('third log');
  equal( Logger.getLog(), "hello world\nsecond log\nthird log", 'logs entries');  
});



/*********************************************** 
     Begin spreadsheet.js 
***********************************************/ 

//-----------------------------------------------------------------------------

test('Base26', function() {
  
  deepEqual(Base26.toRC('B1'), {r:1, c:2}, 'convert A1 to 1,1');
  deepEqual('B1'.toRC(), {r:1, c:2}, 'add toRC method to String');
  deepEqual(Base26.toBase26(10), 'J', 'convert 10 to J');
  deepEqual((10).toBase26(), 'J', 'add toBase26 method to Number');

  deepEqual((1).toBase26(), 'A', '1 = A');
  deepEqual('A1'.toRC(), {r:1, c:1}, 'A = 1');

});

//-----------------------------------------------------------------------------

test('Cell', function() {

  var c = new Cell();
  equal(c.setProperty('content', 'test'), 'test', 'should return what you gave it');
  equal(c.getProperty('content'), 'test', 'should get back my content');
  equal(c.setProperty('content', 'test2'), 'test2', 'should still return what you gave it');
  equal(c.getProperty('content'), 'test2', 'should get back new content');

  c.setProperty('comment', '1234');
  equal(c.getProperty('comment'), '1234', 'should have appended a comment');
  equal(c.getProperty('content'), 'test2', 'should still have content');


  var c = new Cell({ 'content': 'init' });
  equal(c.getProperty('content'), 'init', 'should add properties during init');

  var c = new Cell();
  equal(c.getProperty('content'), '', 'default content should be empty string');
  equal(c.getProperty('comment'), '', 'default comment should be empty string');

});

//-----------------------------------------------------------------------------

test('Sheet', function() {
  var ws = new Sheet();

  /**
   * Internally used methods
   */

  // Int to base26
  equal(ws.indexOf(1, 26), 'Z1', '1,26 = Z1');
  equal(ws.indexOf(1, 27), 'AA1', '1,27 = AA');
  equal(ws.indexOf(1, 28), 'AB1', '1,28 = AB');
  
  // Set cells properties
  ws.setValue(10, 5, { 'content': 'test' });
  equal(ws.cells['E10'].getProperty('content'), 'test', 'get cell property directly');
  equal(ws.getValue('E10'), 'test', 'get cell property by E10');
  equal(ws.getValue(10, 5), 'test', 'get cell property by 10,5');
  equal(ws.getValue(11, 1), null, 'return null for an unset cell');

  // Get a continuous range of cells
  ws.setValue(1, 1, { 'content': 'one' });
  ws.setValue(2, 1, { 'content': 'two' });
  ws.setValue(3, 1, { 'content': 'three' });
  ws.setValue(4, 1, { 'content': 'four' });
  equal(ws.getValues(1, 1, 4, 1).toString(), 'one,two,three,four', 'get range');

  // Get a non-continuous range of cells.
  ws.setValue(1, 2, { 'content': 'philadelphia' });
  ws.setValue(2, 2, { 'content': 'new york' });
  ws.setValue(4, 2, { 'content': 'chicago' });
  equal(ws.getValues(1, 2, 4, 2).toString(), 'philadelphia,new york,,chicago', 'get noncontinuous range');

  // Get range of cells as a 2D array
  var cellRange = ws.getCells(1, 2, 4, 2);
  equal(cellRange[0][0].getProperty('content'), 'philadelphia', 'get a range of cells');
  equal(cellRange[1][0].getProperty('content'), 'new york', 'get a range of cells');
  equal(cellRange[2][0].getProperty('content'), '', 'get a range of cells');
  equal(cellRange[3][0].getProperty('content'), 'chicago', 'get a range of cells');

  /**
   * Externally used methods
   */

  // Initialize sheet
  var ws = new Sheet('Sheet1');
  equal(ws.getName(), 'Sheet1', 'sets and gets sheet name');

  // method clear
  ws.setValue(1, 1, { 'content': 'san fran' });
  ws.clear();
  deepEqual(ws.cells, [], 'clear everything');

  // method getRange()
  var ws = new Sheet();
  raises(function() { ws.getRange() }, 'no arguments should throw');
  raises(function() { ws.getRange(1, 0) }, 'col < 1 should throw');
  raises(function() { ws.getRange(0, 1) }, 'row < 1 should throw');
  raises(function() { ws.getRange(0, 1) }, 'row < 1 should throw');
  raises(function() { ws.getRange('00') }, 'invalid A1 notation should throw');
  ws.setValue(1, 1, { 'content': 'san fran' });
  ws.setValue(2, 1, { 'content': 'miami' });
  ws.setValue(3, 1, { 'content': 'austin' });
  ws.setValue(1, 2, { 'content': 'philadelphia' });
  ws.setValue(2, 2, { 'content': 'new york' });
  ws.setValue(4, 2, { 'content': 'chicago' });
  equal(ws.getRange(1, 1, 2, 2).getValue(), 'san fran', 'get range');
  equal(ws.getRange('A1').getValue(), 'san fran', 'get range with A1');
  equal(ws.getRange('A2').getValue(), 'miami', 'get range with A1');

  // method clearComments()
  ws.setValue(1, 1, { 'comment': 'goes', 'content': 'stays' });
  ws.clearComments();
  equal(ws.getCell(1, 1).getProperty('comment'), '', 'clear comments');

  // method clearContent()
  ws.setValue(1, 1, { 'comment': 'stays', 'content': 'goes' });
  ws.clearContents();
  equal(ws.getCell(1, 1).getProperty('content'), '', 'clear contents');

});

//-----------------------------------------------------------------------------

test('Range', function() {
  var ws = new Sheet();
  ws.setValue(1, 1, { 'content': 'san fran' });
  ws.setValue(2, 1, { 'content': 'miami' });
  ws.setValue(3, 1, { 'content': 'austin' });
  ws.setValue(1, 2, { 'content': 'philadelphia' });
  ws.setValue(2, 2, { 'content': 'new york' });
  ws.setValue(4, 2, { 'content': 'chicago' });

  var r = new Range(ws.getCells(1, 1, 4, 2));
  equal(r.getValue(), 'san fran', 'initializing with cells');
  equal(r.getValues()[0][1], 'philadelphia', 'values into array');
  equal(r.getValues()[1][1], 'new york', 'values into array');
  equal(r.getValues()[2][1], '', 'values into array');
});

//-----------------------------------------------------------------------------

test('Spreadsheet', function() {
  Spreadsheet.insertSheet('Settings');
  var s = Spreadsheet.getSheetByName('Settings');
  console.log(s);
});

//-----------------------------------------------------------------------------

test('SpreadsheetApp', function() {

  // var thisDoc = SpreadsheetApp.getActiveSpreadsheet();
  // var settingsSheet = thisDoc.getSheetByName(SETTINGS_SHEET);  
  // if (settingsSheet == null) {
  //   thisDoc.insertSheet(SETTINGS_SHEET);
  // }    
  // for (var i = 0; i < settings.length; i++) {
  //   var setting = settings[i][0];
  //   if (settings[i][0] == settingName) return settings[i][1];
  // }
  // return false;

  var doc = SpreadsheetApp.getActiveSpreadsheet();
});



/*********************************************** 
     Begin url_fetch.js 
***********************************************/ 


// test('UrlFetchApp.fetch', function() {
//   equal( UrlFetchApp.fetch('').getContent(), 0, 'gets content from html' );
//   equal( UrlFetchApp.fetch('').getContentText(), 0, 'gets content text' );
//   equal( UrlFetchApp.fetch('').getHeaders(), 0, 'returns headers' );
//   equal( UrlFetchApp.fetch('').getResponseCode(), 0, 'gets a response code' );
// });
