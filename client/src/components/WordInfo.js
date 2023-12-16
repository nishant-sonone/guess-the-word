import React from 'react';
import './WordInfo.css';

function WordInfo() {
  return (
    <div className="word-info">
    {wordInfo.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ))}
  </div>
  );
}

export default WordInfo;
