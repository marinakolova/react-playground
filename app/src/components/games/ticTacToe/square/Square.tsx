import * as React from 'react';
import { ISquareProps } from './ISquareProps';

export function Square(props: ISquareProps) {
  
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
