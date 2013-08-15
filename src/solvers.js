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
  var locationsTried = [];

  var resetLocationsTriedArray = function() {
    for (var i=0; i<n; i++) {
      locationsTried[i] = 0;
    }
  };

  resetLocationsTriedArray();


  var findFirstUntriedLocationThatDoesNotHaveAPieceAlready = function(colx, level){ //find first location that hasn't been tried yet
    for (var i=0; i<n; i++) {
        if (locationsTried[i] === 0) {
          locationsTried[i] = 1;
          if (this.currentBoard.get(level)[colx]===0) return true;
        }
      }
    return false;
  };

  var allSpacesOnThisLevelTried = function(level) {
    result = true;
    for (var i=0; i<n; i++) {
      if (locationsTried[i] === 0) {
        result = false;
      }
    }

    return result;
  };

  var findAllSolutions = function(n, prevBoard, level) {
    var currentBoard = prevBoard || new Board({'n':n});
    var currentLevel = level || 0;
//debugger;
    for (var col = 0; col < n; col++) {
      if (findFirstUntriedLocationThatDoesNotHaveAPieceAlready(col, currentLevel)) { //magic
        currentBoard.togglePiece(currentLevel, col);
        if (currentBoard.hasAnyRowConflicts() || currentBoard.hasAnyColConflicts()) {
          currentBoard.togglePiece(currentLevel, col);
        } else {
          if (currentLevel === (n-1)) { //if we found a complete solution
            solutionsArray.push(currentBoard); //add solution to solution array
            if (allSpacesOnThisLevelTried(currentLevel) === false) { //if all the spaces on this level have not been tried
              currentBoard.togglePiece(currentLevel, col); //remove the last placed piece and move on.
            } else {
              return false; //if we found a complete solution and all the spaces on the last level have been tried,
              // then we need to go UP to a previous stack OR depending on how the rest of the program is written,
              // we can just end here and not do anything.
            }

          } else {

            var lowerTreeResult = findAllSolutions(n, currentBoard, (currentLevel+1));
            if (lowerTreeResult===false) {
              if(allSpacesOnThisLevelTried(currentLevel) === false) {
                currentBoard.togglePiece(currentLevel, col);
              } else {
                return false; //return false if all spaces on this level have been tried
              }
            } else {
              currentLevel++; //there are solutions remaining to be found at the next level, let's explore
              resetLocationsTriedArray(); //reset the locations array only when descending a level.
            }

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
