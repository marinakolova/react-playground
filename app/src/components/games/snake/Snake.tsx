import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { TheFood } from './theFood/TheFood';
import { TheSnake } from './theSnake/TheSnake';

import './snake.css';

const getRandomCoordinates = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return [x, y];
};

export function Snake() {
  const [gameOverEffect, setGameOverEffect] = useState<boolean>(false);
  const [food, setFood] = useState<number[]>(getRandomCoordinates);
  const [direction, setDirection] = useState<string>('RIGHT');
  const [snakeDots, setSnakeDots] = useState<number[][]>([
    [0, 0],
    [2, 0],
  ]);
  const [pause, setPause] = useState<boolean>(true);

  const checkIfOutOfBorders = () => {
    let head = snakeDots[snakeDots.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      onGameOver();
    }
  };

  const checkIfCollapsed = () => {
    let snake = [...snakeDots];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach((dot) => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        onGameOver();
      }
    });
  };

  const checkIfEat = () => {
    let head = snakeDots[snakeDots.length - 1];
    return head[0] === food[0] && head[1] === food[1];
  };

  const moveSnake = useCallback(
    (snakeDots, eaten) => {
      let dots = [...snakeDots];
      let head = dots[dots.length - 1];

      switch (direction) {
        case 'RIGHT':
          head = [head[0] + 2, head[1]];
          break;
        case 'LEFT':
          head = [head[0] - 2, head[1]];
          break;
        case 'DOWN':
          head = [head[0], head[1] + 2];
          break;
        case 'UP':
          head = [head[0], head[1] - 2];
          break;

        default:
          break;
      }
      if (direction) {
        dots.push(head);

        eaten ? setFood(getRandomCoordinates()) : dots.shift();

        setSnakeDots([...dots]);
      }
    },
    [direction],
  );

  useEffect(() => {
    if (pause) {
      return;
    }
    checkIfOutOfBorders();
    checkIfCollapsed();
    setTimeout(() => moveSnake(snakeDots, checkIfEat()), 200);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pause, snakeDots]);

  useEffect(() => {
    // document.onkeydown = onKeyDown;
    const onKeyDown = (e: any) => {
      e = e || window.event;
      switch (e.keyCode) {
        case 38:
          console.log('direction', direction);
          !['DOWN', 'UP'].includes(direction) && setDirection('UP');
          break;
        case 40:
          !['DOWN', 'UP'].includes(direction) && setDirection('DOWN');
          break;
        case 37:
          !['LEFT', 'RIGHT'].includes(direction) && setDirection('LEFT');
          break;
        case 39:
          !['LEFT', 'RIGHT'].includes(direction) && setDirection('RIGHT');
          break;

        default:
          break;
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      console.log('direction return', direction); // useEffect precedente
    };
  }, [direction, setDirection]);

  

  const onGameOver = () => {
    handleGameOverEffect();
    setSnakeDots([
      [0, 0],
      [2, 0],
    ]);
    setDirection('RIGHT');
  };

  const handleGameOverEffect = () => {
    setGameOverEffect(true);
    
    setTimeout(() => {
      setGameOverEffect(false);
      setPause((p) => !p);      
    }, 1000);    
  };

  return (
    <>
      <div className="game-area">
        <div className={`${gameOverEffect && 'game-over'}`}></div>
        <TheSnake snakeDots={snakeDots} />
        <TheFood dot={food} />
      </div>
      <div className="btn">
        <button className="play-btn" onClick={() => setPause((p) => !p)}>
          {pause ? 'Play' : 'Pause'}
        </button>
      </div>
    </>
  );
}