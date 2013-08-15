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

window.countNRooksSolutions = function(n){
  var solutionCount;
  var solutionsArray = [];

  var findAllSolutions = function(n, prevBoard, level) {
    var currentBoard = prevBoard || new Board({'n':n});
    var currentLevel = level || 0;
debugger;
    for (var col = 0; col < n; col++) {
      if (currentBoard.get(currentLevel)[col] === 0) {
        currentBoard.togglePiece(currentLevel, col);
        if (currentBoard.hasAnyRowConflicts() || currentBoard.hasAnyColConflicts()) {
          currentBoard.togglePiece(currentLevel, col);
        } else {
          if (currentLevel === (n-1)) {
            solutionsArray.push(currentBoard);
            //currentBoard = new Board({'n':n});
          } else {
            currentLevel++;
            findAllSolutions(n, currentBoard, currentLevel);
          }
        }
      }
    }
  };


  if (n === 0 || n === 1) {
    return 1;
  } else {
    findAllSolutions(n);
  }

  solutionCount = solutionsArray.length;

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
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
