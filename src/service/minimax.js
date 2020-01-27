import { calculateWinner } from "./calculateWinner";

export function minimax(board, boardSize, depth, isMaximizingPlayer) {
  let winnerScore = calculateWinner(board, boardSize).score;

  if (winnerScore === 10 || winnerScore === -10) {
    return winnerScore;
  }

  if (!isMovesLeft(board)) {
    return 0; //draw
  }

  if (isMaximizingPlayer) {
    let bestVal = -100;
    for (let k in board) {
      if (!board[k]) {
        board[k] = 'O';
        let value = minimax(board, boardSize, depth + 1, !isMaximizingPlayer);
        bestVal = Math.max(bestVal, value);
        board[k] = null;
      }
    }
    return bestVal;
  }
  else {
    let bestVal = 100;
    for (let k in board) {
      if (!board[k]) {
        board[k] = 'X';
        let value = minimax(board, boardSize, depth + 1, !isMaximizingPlayer);
        bestVal = Math.min(bestVal, value);
        board[k] = null;
      }
    }
    return bestVal;
  }
}

export function isMovesLeft(board) {
  for (let k in board) {
    if (!board[k]) {
      return true;
    }
  }
  return false;
}