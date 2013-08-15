window.countNRooksSolutions = function(n){
  var solutionCount;
  var solutionsArray = [];

  var findAllSolutions = function(n, prevBoard, level) {
    var currentBoard = prevBoard || new Board({'n':n});
    var currentLevel = (level+1) || 0;
debugger;


    for (var col = 0; col < n; col++) {
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
            findAllSolutions(n, currentBoard, currentLevel);
          }

        }
      }
  };
/*
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
  };*/


  if (n === 0 || n === 1) {
    return 1;
  } else {
    findAllSolutions(n);
  }

  solutionCount = solutionsArray.length;

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};