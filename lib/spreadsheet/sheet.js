/**
 * Class Worksheet
 */
function Sheet(name) {

  var cells_ = [],
      name_,
      lastCol_ = 0,
      lastRow_ = 0;

  function init(name) {
    setName(name);
  }

  function setName(name) {
    name = name || '';
    name_ = name;
  }

  /**
   * Returns the index of a row, column pair
   */
  function indexOf(r, c) {
    return Base26.toBase26(c) + r.toString();
  }

  /**
   * Sets the value of a cell (note: clobbers whatever was there before)
   * @param {int} r Row
   * @param {int} c Col
   * @param {cell} properties Cell properties
   */
  function setValue(r, c, properties) {
    var cell = new Cell(properties);
    cells_[indexOf(r, c)] = cell;
    if (r > lastRow_) { lastRow_ = r; }
    if (c > lastCol_) { lastCol_ = c; }
  }

  /**
   * Gets a value of a cell
   * @param  {int} r Row
   * @param  {int} c Col
   * @return {mixed}
   */
  function getValue(r, c) {
    if (r < 1) { throw 'Row specified must be > 0'; }
    if (c < 1) { throw 'Col specified must be > 0'; }
    var cell;
    if (typeof(r) === 'number') { 
      cell = cells_[indexOf(r, c)];
    } else {
      cell = cells_[r];
    }
    return (cell === undefined) ? null : cell.getProperty('content'); 
  }

  /**
   * Gets the content from cells
   */
  function getValues(startR, startC, endR, endC) {
    var retval = [];
    for (var r = startR; r <= endR; r++) {
      for (var c = startC; c <= endC; c++) {
        retval.push(getValue(r, c));
      }
    }  
    return retval;
  }

  /**
   * Returns one cell
   */
  function getCell(r, c) {
    return cells_[indexOf(r, c)];
  }

  /**
   * Returns a range of cells.  Empty cells are included with empty strings
   */
  function getCells(startR, startC, endR, endC) {
    var retval = [], i;  
    for (var r = startR; r <= endR; r++) {
      retval.push([]);
      for (var c = startC; c <= endC; c++) {
        retval[r-startR].push([]);
        i = indexOf(r, c);
        retval[r - startR][c - startC] = (cells_[i] != undefined)
            ? cells_[indexOf(r, c)]
            : new Cell();
      }
    }
    return retval;
  }

  /**
   * Returns all the coordinates of cells
   */
  function cellKeys() {
    var keys = [];
    for (var key in cells_) { keys.push(key); }
    return keys;
  }

  /**
   * Outputs all the cells to the console
   */
  function dump() {
    var keys = cellKeys().sort();
    console.log(keys);
    for (var key in keys) {
      console.log('  ws -> [' + keys[key] + '] = ' + 
                 cells_[keys[key]].getProperty('content'));
    }
  }

  /**
   * Performs a block over all the cells
   * The block must take (key, cell) as arguments.
   * key == the A1 notation coords
   * cell == an instance of Cell class
   */
  function allCells_(block) {
    for (var key in cells_) { block(key, cells_[key]); }
  }

  init(name);
  return {
    cells: cells_,
    dump: dump,
    cellKeys: cellKeys,
    indexOf: indexOf,
    getValue: getValue,
    getValues: getValues,
    setValue: setValue,
    getCell: getCell,
    getCells: getCells,

    clear: function() { cells_ = []; },

    clearComments: function() { 
      allCells_(function(key, cell) { 
        cell.setProperty('comment', '');
      })
    },

    clearContents: function() {
      allCells_(function(key, cell) { 
        cell.setProperty('content', '');
      })      
    },

    clearFormats: function() {},
    copyTo: function() {},
    deleteColumn: function() {}, // erase col, move evreything over by one
    deleteColumns: function() {},
    deleteRow: function() {},
    deleteRows: function() {},
    getActiveCell: function() {},
    getActiveSelection: function() {},
    getColumnWidth: function() {},
    getDataRange: function() {},
    getFrozenColumns: function() {},
    getFrozenRows: function() {},
    getIndex: function() {},
    getLastColumn: function() {},
    getLastRow: function() {},
    getMaxColumns: function() {},
    getMaxRows: function() {},

    getName: function() { return name_; },

    getParent: function() {},

    getRange: function() {
      var rc, row, col, optNumRows, optNumCols;

      if (arguments.length === 0) { throw 'getRange received no arguments'; }
      if (typeof(arguments[0]) === 'string') {
        rc = Base26.range(arguments[0]);

        // Selection of entire columns (eg: A:J)
        if (rc.start.r == false && rc.end.r == false) {
          row = 1;
          col = rc.start.c;
          optNumRows = lastRow_;
          optNumCols = rc.end.c;

        // Selection of A1 to ....
        } else {
          row = rc.start.r;
          col = rc.start.c;
          optNumRows = arguments[1] || 0;
          optNumCols = arguments[2] || 0;          
        }

      } else if (typeof(arguments[0]) === 'number') {
        if (arguments[1] === undefined) { 
          throw 'getRange received row but no column in the arguments';
        }

        // Selection of a set of numbers
        row = arguments[0];
        col = arguments[1];
        optNumRows = arguments[2] || 0;
        optNumCols = arguments[3] || 0;
      }

      if (row < 1 || col < 1) { throw 'getRange received row or col < 0'}
      return new Range(getCells(row, col, row + optNumRows, col + optNumCols));
    },

    getRowHeight: function() {},
    hideColumn: function() {},
    hideColumns: function() {},
    hideRow: function() {},
    hideRows: function() {},
    insertColumnAfter: function() {},
    insertColumnBefore: function() {},
    insertColumns: function() {},
    insertColumnsAfter: function() {},
    insertColumnsBefore: function() {},
    insertImage: function() {},
    insertImage: function() {},
    insertRowAfter: function() {},
    insertRowBefore: function() {},
    insertRows: function() {},
    insertRowsAfter: function() {},
    insertRowsBefore: function() {},
    setActiveCell: function() {},
    setActiveCell: function() {},
    setActiveSelection: function() {},
    setActiveSelection: function() {},
    setColumnWidth: function() {},
    setFrozenColumns: function() {},
    setFrozenRows: function() {},

    setName: function(name) { name_ = name || ''; },

    setRowHeight: function() {},
    showColumns: function() {},
    showRows: function() {},
    sort: function() {},
    sort: function() {},
    unhideColumn: function() {},
    unhideRow: function() {},
    getActiveRange: function() {}
  };

}
