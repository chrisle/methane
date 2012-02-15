
describe('Logger', function() {
  eval(require('fs').readFileSync(__dirname + '/../../out/methane.js')+'');

  Logger.log('hello world');
  Logger.log('second log');
  Logger.log('third log');
  var test = Logger.getLog();
  it ('should return the log', function() {
    expect(test)
        .toEqual("hello world\nsecond log\nthird log");
  });
});
