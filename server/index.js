// index.js
const express = require('express');
const cors = require('cors');
const wordList = require('./words'); // Import the updated word list

const app = express();
const port = 3001;

app.use(cors());

app.get('/api/word', (req, res) => {
  const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
  console.log(randomWord);
  res.json(randomWord); // Send the selected word object
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
