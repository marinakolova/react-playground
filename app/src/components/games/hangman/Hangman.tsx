import * as React from 'react';
import { useEffect, useState } from 'react';
import randomWords from 'random-words';
import { Button } from '@mui/material';

import './hangman.css';

export function Hangman() {
  const alphabet = ["A", "B", "C", "D", "E", "F", "G",
    "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R",
    "S", "T", "U", "V", "W", "X", "Y", "Z"];
  const [word, setWord] = useState<string>(randomWords(1)[0].toUpperCase());
  const [correctGuesses, setCorrectGuesses] = useState<string[]>([]);
  const [wrongGuesses, setWrongGuesses] = useState<string[]>([]);
  const [timeUp, setTimeUp] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTimeUp(true);
    }, 120000);

    return () => clearTimeout(timeout);
  }, []);

  const maskedWord = word.split('').map(letter => correctGuesses.includes(letter) ? letter : "_").join(" ");

  const reset = () => {
    setCorrectGuesses([]);
    setWrongGuesses([]);
    setWord(randomWords(1)[0].toUpperCase());
    clearTimeout();
  };

  return (
    <div className="center">
      <h1>{maskedWord}</h1>
      {alphabet.map((letter, index) => <Button
        variant="outlined"
        style={{ margin: '4px' }}
        key={index}
        disabled={correctGuesses.includes(letter) || wrongGuesses.includes(letter)}
        onClick={() => {
          if (word.includes(letter)) {
            setCorrectGuesses([...correctGuesses, letter]);
          } else {
            setWrongGuesses([...wrongGuesses, letter]);
          }
        }}
      >
        {letter}
      </Button>
      )}
      {timeUp || wrongGuesses.length > 5 ?
        <p>You lost! The word was: {word}</p>
        : !maskedWord.includes("_") && <p>You won!</p>
      }
      <div className="game-container">
        <svg height="250" width="200" className="figure-container">
          {/* <!-- Rod --> */}
          <line x1="60" y1="20" x2="140" y2="20" />
          <line x1="140" y1="20" x2="140" y2="50" />
          <line x1="60" y1="20" x2="60" y2="230" />
          <line x1="20" y1="230" x2="100" y2="230" />

          {/* <!-- Head --> */}
          {wrongGuesses.length > 0 &&
            <circle cx="140" cy="70" r="20" />
          }
          {/* <!-- Body --> */}
          {wrongGuesses.length > 1 &&
            <line x1="140" y1="90" x2="140" y2="150" />
          }
          {/* <!-- Arms --> */}
          {wrongGuesses.length > 2 &&
            <line x1="140" y1="120" x2="120" y2="100" />
          }
          {wrongGuesses.length > 3 &&
            <line x1="140" y1="120" x2="160" y2="100" />
          }
          {/* <!-- Legs --> */}
          {wrongGuesses.length > 4 &&
            <line x1="140" y1="150" x2="120" y2="180" />
          }
          {wrongGuesses.length > 5 &&
            <line x1="140" y1="150" x2="160" y2="180" />
          }
        </svg>
      </div>
      <Button
        variant="contained"
        onClick={reset}
      >
        Reset
      </Button>
    </div>
  );
}