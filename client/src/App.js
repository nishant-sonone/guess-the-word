import React, { useState, useEffect } from 'react';
import GameBoard from './components/GameBoard';
import Keyboard from './components/Keyboard';
import Popup from './components/Popup';
import './App.css';

function App() {
  const [currentGuess, setCurrentGuess] = useState('');
  const [correctWord, setCorrectWord] = useState('');
  const [wordLength, setWordLength] = useState(5); // Default word length
  const [guesses, setGuesses] = useState(Array(6).fill(null).map(() => Array(wordLength).fill('')));
  const [currentRow, setCurrentRow] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [wordInfo, setWordInfo] = useState('');
  const [showHint, setShowHint] = useState(false);


  useEffect(() => {
    fetchNewWord();
  }, []);

  useEffect(() => {
    setGuesses(Array(6).fill(null).map(() => Array(wordLength).fill('')));
  }, [wordLength]); // Update guesses whenever wordLength changes

  const toggleHint = () => {
    setShowHint(!showHint);
  };
  
  const fetchNewWord = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/word');
      const data = await response.json();
      setCorrectWord(data.word);
      setWordLength(data.word.length);
      setWordInfo(`Meaning: ${data.meaning}\nExample: ${data.example}`);
      setGuesses(Array(6).fill(null).map(() => Array(data.length).fill('')));
    } catch (error) {
      console.error('Error fetching new word:', error);
    }
  };

  const checkGuess = (guess) => {
    return guess.split('').map((letter, index) => {
      if (letter === correctWord[index]) {
        return 'correct';
      } else if (correctWord.includes(letter)) {
        return 'present';
      }
      return 'absent';
    });
  };

  const handleKeyPress = (key) => {
    if (currentGuess.length < wordLength && !gameOver) {
      setCurrentGuess(currentGuess + key);
    }
  };

  const handleSubmitGuess = () => {
    if (currentGuess.length === wordLength && !gameOver) {
      if (currentRow < 6) {
        const newGuesses = [...guesses];
        const feedback = checkGuess(currentGuess);
        newGuesses[currentRow] = { guess: currentGuess, feedback: feedback };
        setGuesses(newGuesses);

        if (currentGuess === correctWord) {
          setWin(true);
          setGameOver(true);
        } else if (currentRow === 6 - 1) {
          setGameOver(true);
        }

        setCurrentRow(currentRow + 1);
        setCurrentGuess('');
      }
    }
  };

  const resetGame = () => {
    setCurrentGuess('');
    setGuesses(Array(6).fill(null).map(() => Array(wordLength).fill('')));
    setCurrentRow(0);
    setGameOver(false);
    setWin(false);
    fetchNewWord();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Guess The Word Sahaana !</h1> 
      </header>
      <button className="hint-button" onClick={toggleHint}>Get Hint</button>
      {showHint && (
        <Popup
          message="Here's a hint!"
          wordInfo={`${wordInfo.split('\n')[0]}`} // Show only the meaning part
          onNewGame={() => setShowHint(false)} // Close the hint popup
          buttonLabel="Close" // Custom label for the button
        />
      )}
      <GameBoard guesses={guesses} currentGuess={currentGuess} wordLength={wordLength} currentRow={currentRow} />
      <Keyboard onKeyPress={handleKeyPress} onSubmitGuess={handleSubmitGuess} />
      {gameOver && (
        <Popup
          message={win ? "Congratulations! You guessed the word!" : "Game Over. Try again!"}
          wordInfo={win ? wordInfo : null}
          onNewGame={resetGame}
        />
      )}
    </div>
  );
}

export default App;
