import * as React from 'react';
import { ITheSnakeProps } from './ITheSnakeProps';

export function TheSnake(props: ITheSnakeProps) {

  return (
    <>
      {props.snakeDots.map((dot, i) => {
        const style = {
          left: `${dot[0]}%`,
          top: `${dot[1]}%`,
        }
        return <div className="snake-dot" key={i} style={style}></div>
      })}
    </>
  );
}
