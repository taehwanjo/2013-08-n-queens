// Write code here that will find the solution count for a board of any size.
// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)

window.findNRooksSolution = function(n){
  // var solution = undefined;
  // n = number of rooks
   // check i to 'n'
  // place rooks in indexes 0 to n
  // step 2: we deduct the threatened squares from possible solutions
  // recurse on remaining squares.

//var x = makeEmptyMatrix(this.get('n'));


  var columnStart = 0;
  var solution = new Board({'n':n});
    for(var x = 0; x < n; x++) { //explores 4 possibilities on a 4x4 board (x represents first 4 positions)
      for (var i = columnStart; i < n; i++) { //checks out every square
        if(!solution.hasAnyRowConflicts && !solution.hasAnyColConflicts) {
          solution.togglePiece(x,i); //x is rowIndex, and i is columnIndex
          i = n; //can no longer put piece on this row
        }
      columnStart++;
      }
    }
  console.log('Single solution for ' + n + ' rooks:', solution);
  return solution;
};

window.countNRooksSolutions = function(n, boardArg, oldPieceCount, isBranch){

//step 1: fresh board, no banned spaces, we put rook on first unbanned space, then iterate across ALL spaces on board.
//step 2: ban the spaces threatened by rook, and then recurse.



//done.
var solution;

  var solutionObject = {'solutionArray':[], newboard:false };
  //debugger;
  if (boardArg && solutionObject.newboard===false) {
    solution = boardArg;
  } else {
    solution = new Board({'n':n});
  }

  var pieceCount = oldPieceCount || 0;
     debugger;
  //find first unbanned space
  for (var y=0; y<n; y++) {
    for (var x=0; x<n; x++) {
      if(existingSolutions) {
        var keepGoing;
        for (var z=0; z<existingSolutions.length; z++) {
          if (existingSolutions[z].get(y)[x]!==0) {
            keepGoing = false;
          }
        }

        if (keepGoing) {

          // when recursing, the togglePiece turns the first piece off! (fixed)
            if (solution.get(y)[x]===0) solution.togglePiece(y,x);
            if (solution.hasRowConflictAt(y) || solution.hasColConflictAt(x)) {
              solution.togglePiece(y,x);
            } else {
              pieceCount++;
              if(pieceCount === n) {
                solutionObject.solutionArray.push(solution);
                pieceCount = 0; //reset piece count
                if (isBranch) {
                  solutionObject[newboard] = true;
                  return solutionObject;
                } else {
                  solutionObject[newboard] = false;
                }
              } else {
                if (x!==n && y!==n) {
                  debugger;
                  // solution is not being passed into the recursion
                  solutionObject.solutionArray.concat(countNRooksSolutions(n, solution, pieceCount, true));
                  if (solutionObject.newboard === true) {
                    solution = new Board({'n':n});
                    var existingSolutions = solutionObject.solutionArray;
                    solutionObject.newboard = false;
                  }
                }
              }
            }
          
        }
      }
    }
  }

//remove duplicates
  solutionCount = solutionObject.solutionArray.length;

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  if (solutionCount === 0) {
    return 1;
  } else {
    return solutionCount;
  }

};

window.findNQueensSolution = function(n){
  var solution = new Board({'n':n});
  var columnStart = 0;
    for(var x = 0; x < n; x++) { //explores 4 possibilities on a 4x4 board (x represents first 4 positions)
      for (var i = columnStart; i < n; i++) { //checks out every square
        if(!solution.hasAnyRowConflicts && !solution.hasAnyColConflicts && !solution.hasAnyMajorDiagonalConflicts && !hasAnyMinorDiagonalConflicts) {
          solution.togglePiece(x,i); //x is rowIndex, and i is columnIndex
          i = n; //can no longer put piece on this row
        }
      columnStart++;
      }
    }
  console.log('Single solution for ' + n + ' queens:', solution);
  return solution;
};

window.countNQueensSolutions = function(n){
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};


// This function uses a board visualizer lets you view an interactive version of any piece matrix.

window.displayBoard = function(matrix){
  $('body').html(
    new BoardView({
      model: new Board(matrix)
    }).render()
  );
};
