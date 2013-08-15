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