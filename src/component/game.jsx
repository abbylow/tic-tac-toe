import React from 'react';
import { Board } from ".";
import { calculateWinner } from "../service/calculateWinner";
import { minimax } from '../service/minimax';

export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{ squares: Array(9).fill(null), location: { col: null, row: null } }],
      xIsNext: true,
      stepNumber: 0,
      isAsc: true,
      boardSize: 3,
      sizeInput: 3,
      gameMode: 0,  //0 = AI, 1 = Human
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const { boardSize, xIsNext, gameMode } = this.state;
    if (calculateWinner(squares, boardSize).winner || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O';
    if (xIsNext && !gameMode) {
      this.findBestAiMove(squares, boardSize);
    }
    else {
      this.setState({
        history: history.concat({ squares, location: { col: i % 3, row: parseInt(i / 3) } }),
        xIsNext: !xIsNext,
        stepNumber: history.length,
      });
    }
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    })
  }

  sort() {
    this.setState({ isAsc: !this.state.isAsc });
  }

  restart() {
    this.setState({
      history: [{ squares: Array(9).fill(null), location: { col: null, row: null } }],
      xIsNext: true,
      stepNumber: 0,
      isAsc: true,
    });
  }

  changeBoardSize = (e) => {
    this.setState({ sizeInput: e.target.value });
  }

  reflectBoardSize = () => {
    const sizeInput = this.state.sizeInput;
    if (this.state.history.length === 1) {
      if (sizeInput > 2 && sizeInput < 21) {
        this.setState({
          boardSize: sizeInput
        })
      }
      else {
        alert("Can only change the board size between 3 to 20.")
      }
    }
    else {
      alert("Can only change the board size before game starts.")
    }
  }

  changeGameMode = () => {
    if (this.state.history.length === 1) {
      this.setState({ gameMode: !this.state.gameMode })
    }
    else {
      alert("Can only change the mode before game starts.")
    }
  }

  findBestAiMove = (squares, boardSize) => {
    let bestVal = -1000;
    let bestMove = -1;

    for (let k in squares) {
      if (!squares[k]) {
        squares[k] = 'O';
        let moveVal = minimax(squares, boardSize, 0, (!!false));
        squares[k] = null;
        if (moveVal > bestVal) {
          bestMove = k;
          bestVal = moveVal;
        }
      }
    }
    squares[bestMove] = 'O'
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    this.setState({
      history: history.concat({ squares, location: { col: bestMove % 3, row: parseInt(bestMove / 3) } }),
      xIsNext: true,
      stepNumber: history.length,
    });
  }

  render() {
    const { history, boardSize, sizeInput, gameMode } = this.state;
    const current = history[this.state.stepNumber];
    const { winner, wonLine } = calculateWinner(current.squares, boardSize);

    const moves = history.map((step, move) => {
      const desc = move ? `Go to move # ${move} ( ${step.location.col} , ${step.location.row})` : "Go to game start";
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>
            {move === this.state.stepNumber ? (<b>{desc}</b>) : desc}
          </button>
        </li>
      )
    })

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    }
    else if (current.squares.filter(el => el === null).length === 0) {
      status = 'It is a Draw';
    }
    else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} wonLine={wonLine} boardSize={boardSize} onClick={(i) => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button onClick={() => this.restart()}>Restart the game</button>
          <button onClick={() => this.sort()}>Toggle order</button>
          <button onClick={() => this.changeGameMode()}>{gameMode ? 'Change O = AI opponent' : 'Change O = human opponent'}</button>
          <ol>{this.state.isAsc ? moves : moves.reverse()}</ol>

          Board Size: <input type="number" name="boardSize" value={sizeInput} onChange={this.changeBoardSize} />
          <button onClick={() => this.reflectBoardSize()}>Confirm</button>
        </div>
      </div>
    );
  }
}