(function(){

  window.Board = Backbone.Model.extend({

    initialize: function(params){
      if (params.n) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function(){
      return _(_.range(this.get('n'))).map(function(rowIndex){
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex){
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex){
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex){
      return colIndex + rowIndex;
    },


    hasAnyRooksConflicts: function(){
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex){
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function(){
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex){
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    // todo: fill in all these functions - they'll help you!

    hasRowConflictAt: function(rowIndex){
      // checks for a conflict at row index
      var pieceCount = 0;
      var row = this.get(rowIndex);
      for (var i = 0; i < row.length; i++) {
        if (row[i] === 1) pieceCount++;
      }
      if (pieceCount > 1) return true;
      return false; // fixme
    },

    hasAnyRowConflicts: function(){
      // check for row conflicts for all the rows in n
      for (var i = 0; i < this.get('n'); i++) {
        if (this.hasRowConflictAt(i)) return true;
      }
      return false; // fixme
    },

    hasColConflictAt: function(colIndex){
      var row;
      var pieceCount = 0;
      for (var i = 0; i < this.get('n'); i++) {
          row = this.get(i);
          if (row[colIndex] === 1) pieceCount++;
      }
      if (pieceCount > 1) return true;
      return false; // fixme
    },

    hasAnyColConflicts: function(){
      //n^3 so let's refactor this later ^_^
        for (var i = 0; i < this.get('n'); i++) {
          if (this.hasColConflictAt(i) === true) return true;
        }
        return false;
    },

    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow){
      var pieceCount = 0;
      if(majorDiagonalColumnIndexAtFirstRow >=0) {
        var diagonalLength = this.get('n') - majorDiagonalColumnIndexAtFirstRow;
        for (var i = 0; i < diagonalLength; i++) {
          //debugger;
          if (this.get(i)[majorDiagonalColumnIndexAtFirstRow + i] === 1) pieceCount++;
        }
        if (pieceCount > 1) return true;
        return false;
      } else { //majorDiagonalColumnIndexAtFirstRow is negative
        var diagonalLength2 = this.get('n') - Math.abs(majorDiagonalColumnIndexAtFirstRow);
        for (var x = 0; x < diagonalLength2; x++) {
          if (this.get(Math.abs(majorDiagonalColumnIndexAtFirstRow) + x)[x]) pieceCount++;
        }
        if (pieceCount > 1) return true;
        return false;
      }

    },

    hasAnyMajorDiagonalConflicts: function(){
      //for (var i = (1-this.get('n')); i < this.get('n'); i++) {
      for (var i = (0-this.get('n')); i < this.get('n'); i++) {
        if (this.hasMajorDiagonalConflictAt(i) === true) return true;
      }
      return false; // fixme
    },

    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow){
      var pieceCount = 0;
      if(minorDiagonalColumnIndexAtFirstRow < this.get('n')) {
        var diagonalLength = minorDiagonalColumnIndexAtFirstRow + 1;
        for (var i = 0; i < diagonalLength; i++) {
          //debugger;
          if (this.get(i)[minorDiagonalColumnIndexAtFirstRow - i] === 1) pieceCount++;
        }
        if (pieceCount > 1) return true;
        return false;
      } else { //minorDiagonalColumnIndexAtFirstRow is negative
        var diagonalLength2 = this.get('n') - (minorDiagonalColumnIndexAtFirstRow - (this.get('n') - 1));
        for (var x = 0; x < diagonalLength2; x++) {
          if (this.get((this.get('n') - diagonalLength2) + x)[(this.get('n')-1)-x]) pieceCount++;
        }
        if (pieceCount > 1) return true;
        return false;
      }
    },

    hasAnyMinorDiagonalConflicts: function(){
      for (var i = 0; i < (this.get('n') + this.get('n')); i++) {
       if (this.hasMinorDiagonalConflictAt(i) === true) return true;
     }
      return false;
    }
  });

  var makeEmptyMatrix = function(n){
    return _(_.range(n)).map(function(){
      return _(_.range(n)).map(function(){
        return 0;
      });
    });
  };

}());
