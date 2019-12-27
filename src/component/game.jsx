import React from 'react';
import { Board } from ".";
import { calculateWinner } from "../service/calculateWinner";

export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{ squares: Array(9).fill(null), location: { col: null, row: null } }],
      xIsNext: true,
      stepNumber: 0,
      isAsc: true,
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares).winner || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat({ squares, location: { col: i % 3, row: parseInt(i / 3) } }),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    });
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

  restart(){
    this.setState({
      history: [{ squares: Array(9).fill(null), location: { col: null, row: null } }],
      xIsNext: true,
      stepNumber: 0,
      isAsc: true,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const { winner, wonLine } = calculateWinner(current.squares);

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
          <Board squares={current.squares} wonLine={wonLine} onClick={(i) => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button onClick={() => this.sort()}>Toggle order</button>
          <ol>{this.state.isAsc ?  moves : moves.reverse()}</ol>
          <button onClick={() => this.restart()}>Restart the game</button>
        </div>
      </div>
    );
  }
}