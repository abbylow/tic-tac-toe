import React from 'react';
import { Square } from ".";

export class Board extends React.Component {

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