import React from 'react';
import './Popup.css';

function Popup({ message, wordInfo, onNewGame, buttonLabel }) {
    return (
      <div className="popup">
        <div className="popup-content">
          <h2>{message}</h2>
          {wordInfo && <div className="word-info">{wordInfo}</div>}
          <button onClick={onNewGame}>{buttonLabel || 'Close'}</button>
        </div>
      </div>
    );
  }
  
  export default Popup;
  