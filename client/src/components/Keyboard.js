import React from 'react';
import './Keyboard.css';

function Keyboard({ onKeyPress, onSubmitGuess }) {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <div className="keyboard">
      {letters.map(letter => (
        <button key={letter} className="key" onClick={() => onKeyPress(letter)}>
          {letter}
        </button>
      ))}
      <button className="key submit" onClick={onSubmitGuess}>Enter</button>
    </div>
  );
}

export default Keyboard;
