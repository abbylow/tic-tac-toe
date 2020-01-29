import { calculateWinner } from "./calculateWinner";

export function minimax(board, boardSize, depth, isMaximizingPlayer, alpha, beta) {
  let winnerScore = calculateWinner(board, boardSize).score;
  if (winnerScore === 10) {
    return winnerScore - depth;
  }

  if (winnerScore === -10) {
    return winnerScore + depth;
  }

  if (!isMovesLeft(board)) {
    return 0; //draw
  }

  //to prevent the program running forever
  if (depth > 5) {
    return 0; 
  }

  if (isMaximizingPlayer) {
    let bestVal = -100;
    for (let k in board) {
      if (!board[k]) {
        board[k] = 'O';
        let value = minimax(board, boardSize, depth + 1, !isMaximizingPlayer, alpha, beta);
        bestVal = Math.max(bestVal, value);
        alpha = Math.max(alpha, bestVal);
        board[k] = null;
        if (beta <= alpha){
          break;
        }
      }
    }
    return bestVal;
  }
  else {
    let bestVal = 100;
    for (let k in board) {
      if (!board[k]) {
        board[k] = 'X';
        let value = minimax(board, boardSize, depth + 1, !isMaximizingPlayer, alpha, beta);
        bestVal = Math.min(bestVal, value);
        beta = Math.min(beta, bestVal);
        board[k] = null;
        if (beta <= alpha){
          break;
        }
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