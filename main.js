//window.addEventListener('load', init);  

// Globals

// Available Levels
const levels = {
  easy: 5,
  medium: 3,
  hard: 1
};

// To change level
const currentLevel = levels.easy;

let time = currentLevel;
let score = 0;
let isPlaying;

// DOM Elements
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');
const highscoreDisplay = document.querySelector('#highscore');
let msg = new SpeechSynthesisUtterance();
let randomWord = ""
let countDownIntervId = null;
let statusintervId = null;
wordInput.addEventListener('input', startMatch);

const words = [
  'hat',
  'river',
  'lucky',
  'statue',
  'generate',
  'stubborn',
  'cocktail',
  'runaway',
  'joke',
  'developer',
  'establishment',
  'hero',
  'javascript',
  'nutrition',
  'revolver',
  'echo',
  'siblings',
  'investigate',
  'horrendous',
  'symptom',
  'laughter',
  'magic',
  'master',
  'space',
  'definition',
  'cat',
  'school',
  'library',
  'national',
  'drive',
  'ride',
  'kite',
  'wind',
  'water',
  'earth',
  'score',
  'get',
  'put'
];

// Initialize Game
function init() {
  if (countDownIntervId) {
    clearInterval(countDownIntervId);
    countDownIntervId = null;
  }

  if (statusintervId) {
    clearInterval(statusintervId)
    statusintervId = null;
  }

  isPlaying = true;
  time = currentLevel;
  score = 0
  scoreDisplay.innerHTML = 0;

  // Show number of seconds in UI
  seconds.innerHTML = currentLevel;
  wordInput.value = ''
  //wordInput.innerHTML = "";

  // Load word from array
  showWord(words);
  wordInput.focus();

  // Call countdown every second
  if (!countDownIntervId) {    
    countDownIntervId = setInterval(countdown, 1000);
  }
  if (!statusintervId) {
    // Check game status
    statusintervId = setInterval(checkStatus, 50);
  }
}

// Start match
function startMatch() {
  if (matchWords()) {
    isPlaying = true;
    time = currentLevel + 1;
    showWord(words);
    wordInput.value = '';
    score++;
  }

  // Highscore based on score value for Session Storage
  if (typeof sessionStorage['highscore'] === 'undefined' || score > sessionStorage['highscore']) {
    sessionStorage['highscore'] = score;
  } else {
    sessionStorage['highscore'] = sessionStorage['highscore'];
  }

  // Prevent display of High Score: -1
  if (sessionStorage['highscore'] >= 0) {
    highscoreDisplay.innerHTML = sessionStorage['highscore'];
  }

  // If score is -1, display 0
  if (score === -1) {
    scoreDisplay.innerHTML = 0;
  } else {
    scoreDisplay.innerHTML = score;
  }
}

// Match currentWord to wordInput
function matchWords() {
  if (wordInput.value.toLowerCase() === randomWord) {
    message.innerHTML = 'Correct!!!';
    return true;
  } else {
    message.innerHTML = '';
    return false;
  }
}

// Pick & show random word
function showWord(words) {
  // Generate random array index
  const randIndex = Math.floor(Math.random() * words.length);
  // Speak random word
  msg.text = randomWord = words[randIndex];
  window.speechSynthesis.speak(msg);
}

function play() {
  msg.text = randomWord
  window.speechSynthesis.speak(msg);
}

// Countdown timer
function countdown() {
  // Make sure time is not run out
  if (time > 0) {
    // Decrement
    time--;
  } else if (time === 0) {
    // Game is over
    isPlaying = false;
  }
  // Show time
  timeDisplay.innerHTML = time;
}

// Check game status
function checkStatus() {
  if (!isPlaying && time === 0) {
    message.innerHTML = 'Game Over!!!';
    score = -1;
  }
}