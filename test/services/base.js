
test('Logger', function() {
  Logger.log('hello world');
  Logger.log('second log');
  Logger.log('third log');
  equal( Logger.getLog(), "hello world\nsecond log\nthird log", 'logs entries');  
});

