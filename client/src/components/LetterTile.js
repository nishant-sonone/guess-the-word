import React from 'react';
import './LetterTile.css';

function LetterTile({ letter, feedback }) {
  return (
    <div className={`letter-tile ${feedback}`}>
      {letter}
    </div>
  );
}

export default LetterTile;
