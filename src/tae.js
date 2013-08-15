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

//new idea
//step 1: get the board from arguments passed, or make a new board if no board argument was passed.
//step 2: place a piece on the board in a place where there is no existing piece AND in a location that we haven't tried before UNLESS WEVE TRIED EVERYTHING!
//if we've tried everything, return false?
//step 3: check if the newly placed piece creates any conflicts.
//step 4: if no conflicts, then add the piece to the list of locations tried at that level of the stack, then
//if stack depth is n, then add solution to solution array and go to step 1 with a blank board.
//if stack depth is not n, then pass the board into the function via recursion.  if conflicts, go to step 2.

var solutionArray =[];

var findSolutions = function(board, locs) {

  var locationsTried = locs || [];
  var pieceCount = 0;

  var findFirstUntriedLocationThatDoesNotHaveAPieceAlready = function(){ //find first location that hasn't been tried yet
    for (var y=0; y<n; y++) {
      for (var x=0; x<n; x++) {
        if (locationsTried[y][x] === 0) {
          locationsTried[y][x] = 1;
          if (board.get(y)[x]===0) {
            return [y, x];
          }
        }
      }
    }
    return false;
  };

  locationToPlacePiece = findFirstUntriedLocationThatDoesNotHaveAPieceAlready();

  if (locationToPlacePiece === false) {
    return false;
  } else {
    //place piece
    board.TogglePiece(locationToPlacePiece[0], locationToPlacePiece[1]);
      //check for conflicts
    if (solution.hasRowConflictAt(y) || solution.hasColConflictAt(x)) {
      solution.togglePiece(y,x); //remove piece if conflicts
      findSolutions(board, locationsTried); //go back to beginning and pass in the locations tried
    } else {
      pieceCount++;
      if (pieceCount === n) {
        solutionArray.push(board);
      } else {
        findSolutions(board); //do not pass in locations tried because you want to check all possible board locations.
      }

    }
  }

};



findSolutions(); //adds solutions to solutionArray
removeDuplicates(); //removes duplicate solutions from solutionArray

return solutionArray;


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
