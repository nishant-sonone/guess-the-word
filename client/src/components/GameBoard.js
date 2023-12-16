import React from 'react';
import LetterTile from './LetterTile';
import './GameBoard.css';

function GameBoard({ guesses, currentGuess, wordLength, currentRow }) {
  return (
    <div className="game-board">
      {guesses.map((guess, rowIndex) => {
        const isCurrentRow = rowIndex === currentRow;
        // Ensuring guessString is always defined
        const guessString = (isCurrentRow ? currentGuess : guess?.guess ?? '').padEnd(wordLength, ' ');

        return (
          <div key={rowIndex} className="row">
            {Array.from({ length: wordLength }).map((_, letterIndex) => (
              <LetterTile 
                key={letterIndex} 
                letter={guessString[letterIndex]} 
                feedback={isCurrentRow ? '' : guess?.feedback ? guess.feedback[letterIndex] ?? '' : ''}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}



export default GameBoard;
