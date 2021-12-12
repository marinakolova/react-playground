import * as React from 'react';
import { useState } from 'react';
import { Snake } from '../games/snake/Snake';
import { TicTacToe } from '../games/ticTacToe/TicTacToe';
import { NavBar } from './navBar/NavBar';

export interface IGameSwitcherProps {
}

export function GameSwitcher(props: IGameSwitcherProps) {
  const [selected, setSelected] = useState<number>(0);

  return (
    <>
      <NavBar
        selected={selected}
        setSelected={setSelected}
      />
      {selected === 0 && <TicTacToe />}
      {selected === 1 && <Snake />}
    </>
  );
}
