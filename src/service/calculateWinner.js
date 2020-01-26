export function calculateWinner(squares, boardSize) {
  let finalWinner = null;
  let finalWonLine = [];

  // Check the horizontal lines 
  let hrzRow = 0;
  while (hrzRow < boardSize && !finalWinner) {
    let hrzWonLine = [(boardSize * hrzRow) + 0];
    let hrzWinner = squares[(boardSize * hrzRow) + 0];
    let hrzCol = 1;
    while (hrzCol < boardSize && hrzWinner) {
      let k = (boardSize * hrzRow) + hrzCol;
      if (hrzWinner !== squares[k]) {
        hrzWinner = null;
      }
      hrzWonLine.push(k);
      hrzCol++;
    }
    if (hrzWinner) {
      finalWinner = hrzWinner;
      finalWonLine = hrzWonLine;
    }
    hrzRow++;
  }

  // Check the vertical lines 
  let vtcCol = 0;
  while (vtcCol < boardSize && !finalWinner) {
    let vtcWonLine = [(boardSize * 0) + vtcCol];
    let vtcWinner = squares[(boardSize * 0) + vtcCol];
    let vtcRow = 1;
    while (vtcRow < boardSize && vtcWinner) {
      let k = (boardSize * vtcRow) + vtcCol;
      if (vtcWinner !== squares[k]) {
        vtcWinner = null;
      }
      vtcWonLine.push(k);
      vtcRow++;
    }
    if (vtcWinner) {
      finalWinner = vtcWinner;
      finalWonLine = vtcWonLine;
    }
    vtcCol++;
  }

  // Check the diagonal line (left top to right bottom)
  let ltrWinner = squares[0];
  if (!finalWinner && ltrWinner) {
    let ltrWonLine = [0];
    for (let count = 1; count < boardSize; count++) {
      let k = (boardSize * count) + count;
      if (ltrWinner !== squares[k]) {
        ltrWinner = null;
        break;
      }
      ltrWonLine.push(k);
    }
    if (ltrWinner) {
      finalWinner = ltrWinner;
      finalWonLine = ltrWonLine;
    }
  }

  // Check the diagonal line (right top to left bottom)
  let rtlWinner = squares[(boardSize * (boardSize - 1))];
  if (!finalWinner && rtlWinner) {
    let rtlWonLine = [boardSize * (boardSize - 1)];
    for (let count = 1; count < boardSize; count++) {
      let k = (boardSize * (boardSize - 1 - count)) + count;
      if (rtlWinner !== squares[k]) {
        rtlWinner = null;
        break;
      }
      rtlWonLine.push(k);
    }
    if (rtlWinner) {
      finalWinner = rtlWinner;
      finalWonLine = rtlWonLine;
    }
  }

  return { winner: finalWinner, wonLine: finalWonLine };
}