import React from 'react';

export function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.bold ? <b>{props.value}</b> : <div>{props.value}</div>}
    </button>
  );
}
