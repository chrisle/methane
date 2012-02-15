
Google apps script emulator

Written because my code > 1000 lines long in GAS takes too long to save.
Besides, i would rather be using jasmine anyway.

Basically, what I want is ...

  var spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
  spreadSheet.insertSheet('Settings');
  var ws = spreadSheet.getSheetByName('Settings');

  // todo: don't use an array.  Make it like Google Apps does it.
  ws.setValue(1, 1, { 'content': 'test 1' });
  ws.setValue(1, 2, { 'content': 'content 1' });
  ws.setValue(2, 1, { 'content': 'test 2' });
  ws.setValue(2, 2, { 'content': 'content 2' });

  // spits out the entire spreadsheet to console.log
  ws.dump();
