import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.bold ? <b>{props.value}</b> : <div>{props.value}</div>}
    </button>
  );
}

class Board extends React.Component {

  renderSquare(i, highlight) {
    return <Square key={`square-${i}`} bold={highlight} value={this.props.squares[i]} onClick={() => { this.props.onClick(i) }} />;
  }

  renderBoard() {
    let board = [];
    for (let k = 0; k < 3; k++) {
      let row = [];
      for (let m = 0; m < 3; m++) {
        let i = (3 * k) + m;
        let highlight = false;
        if (this.props.wonLine.length > 0 && this.props.wonLine.indexOf(i) > -1) {
          highlight = true;
        }
        row.push(this.renderSquare(i, highlight));
      }
      board.push(<div className="board-row" key={`row-${k}`}>{row}</div>);
    }
    return board;
  }

  render() {
    return (
      <div>
        {this.renderBoard()}
      </div>
    );
  }
}

class Game extends React.Component {
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
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], wonLine: lines[i] };
    }
  }
  return { winner: null, wonLine: [] };
}