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

  var reallySlowCopyBoard = function(obj) {
    var copy = new Board({'n':n});
    for (var i=0; i<n; i++){
      copy.set(i, obj.get(i).concat());
    }
    return copy;
  };


  var findAllSolutions = function(n, prevBoard, level) {
    var currentBoard = prevBoard;
    var currentLevel = (level+1) || 0;

//debugger;

    for (var col = 0; col < n; col++) {
        if (currentLevel === 0) currentBoard = new Board({'n':n});
        currentBoard.togglePiece(currentLevel, col);
        if (currentBoard.hasAnyRowConflicts() || currentBoard.hasAnyColConflicts()) {
          currentBoard.togglePiece(currentLevel, col); //if conflict, branch is completely done! do nothing now.
        } else {
          //the piece is still there.
          //base case
          if (currentLevel === (n-1)) {
            solutionsArray.push(currentBoard);
          } else {
          //step case
            var levelBoard = reallySlowCopyBoard(currentBoard);
            currentBoard.togglePiece(currentLevel,col);
            findAllSolutions(n, levelBoard, currentLevel);
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
  var solutionCount;
  var solutionsArray = [];

  var reallySlowCopyBoard = function(obj) {
    var copy = new Board({'n':n});
    for (var i=0; i<n; i++){
      copy.set(i, obj.get(i).concat());
    }
    return copy;
  };


  var findAllSolutions = function(n, prevBoard, level) {
    var currentBoard = prevBoard;
    var currentLevel = (level+1) || 0;

//debugger;

    for (var col = 0; col < n; col++) {
        if (currentLevel === 0) currentBoard = new Board({'n':n});
        currentBoard.togglePiece(currentLevel, col);
        if (currentBoard.hasAnyColConflicts() || currentBoard.hasAnyRowConflicts() || currentBoard.hasAnyMajorDiagonalConflicts2() || currentBoard.hasAnyMinorDiagonalConflicts2()) {
          currentBoard.togglePiece(currentLevel, col); //if conflict, branch is completely done! do nothing now.
        } else {
          //the piece is still there.
          //base case
          if (currentLevel === (n-1)) {
            solutionsArray.push(currentBoard);
          } else {
          //step case
            var levelBoard = reallySlowCopyBoard(currentBoard);
            currentBoard.togglePiece(currentLevel,col);
            findAllSolutions(n, levelBoard, currentLevel);
          }

        }
      }
  };


  if (n === 0 || n === 1) {
    return 1;
  } else if (n === 2 || n === 3) {
    return 0;
  } else {
    findAllSolutions(n);
  }

  solutionCount = solutionsArray.length;

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
