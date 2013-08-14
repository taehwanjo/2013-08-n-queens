it's gonna map that whole shabang

inside shabang,

conflictDetected = board['hasAnyRowConflicts']();  <-- gets compared to -->  conflictExpected = _(['row', 'rooks', 'queens']).contains('row');
conflictDetected = board['hasAnyColConflicts']();
conflictDetected = board['hasAnyRooksConflicts']();
conflictDetected = board['hasAnyMajorDiagonalConflicts']();
conflictDetected = board['hasAnyMinorDiagonalConflicts']();
conflictDetected = board['hasAnyQueensConflicts']();

conflictExpected = 











_.range(4)
_[0,1,2,3].map(function(rowIndex) { 
return this.get(rowIndex);

}, this)

n=4
[0, 0, 0, 0]
[[0, 0, 0, 0],
 [0, 0, 0, 0],
 [0, 0, 0, 0],
 [0, 0, 0, 0]]


if board is empty, place first piece on space "i" where i is the count for starting spaces already tried

find spaces within bounds of the entire board
then find spaces that are not currently threatened on the entire board
pick the first space on the board that you find and then check if there are any new threats caused by the new piece.  if there are threats, then move the piece to the next square that you find.
repeat this until there are no more available spaces on the board, and record the solution

THEN i++ and repeat this entire process again