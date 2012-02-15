  describe('Cell', function() {

    var c = new Cell();

    it('should return what you gave it', function() {
      expect(c.setProperty('content', 'test')).toEqual('test');
    });

    it('should get back my content', function() {
      expect(c.getProperty('content')).toEqual('test');
    });

    it('should still return what you gave it', function() {
      expect(c.setProperty('content', 'test2')).toEqual('test2');
    });

    it('should get back new content', function() {
      expect(c.getProperty('content')).toEqual('test2');
    });

    c.setProperty('comment', '1234');

    it('should have appended a comment', function() {
      expect(c.getProperty('comment')).toEqual('1234');
    });

    it('should still have content', function() {
      expect(c.getProperty('content')).toEqual('test2');
    });

    var c = new Cell({ 'content': 'init' });
    
    it('should add properties during init', function() {
      expect(c.getProperty('content')).toEqual('init');
    });

    var c = new Cell();
    
    it('default content should be empty string', function() {
      expect(c.getProperty('content')).toEqual('');
    });

    it('default comment should be empty string', function() {
      expect(c.getProperty('comment')).toEqual('');
    });

  });
