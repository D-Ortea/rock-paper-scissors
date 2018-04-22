//DOM elements
const playDiv = document.querySelector('#playing-area');
const scoreDiv = document.querySelector('#container').querySelector('div');
const playButton = document.querySelector('.play');
let scorePanel, gameResultPanel;
let resetButton;

// Constants
const DRAW = 0;
const WIN = 1;
const LOSE = 2;
const BOARD_ROWS = 7;
const BOARD_COLS = 5;
const PLAYER = 0;
const COMPUTER = 1;
const FULL = [0, BOARD_ROWS * BOARD_COLS - BOARD_COLS];
const FIRST_HALF = [0, Math.floor(BOARD_ROWS / 2) * BOARD_COLS];
const SECOND_HALF = [Math.floor(BOARD_ROWS / 2) * BOARD_COLS, BOARD_ROWS * BOARD_COLS - BOARD_COLS];

// Global variables
const storage = window.sessionStorage;
const select = (str) => document.querySelector(str);
// let playerSelection, computerSelection;
// let score = [0, 0];

function loadChoicesElements() {
  createScorePanel();
  addChoiceListeners();
  updateScoreBoard();
}

function loadRoundResultElements() {
  createScorePanel();
  updateScoreBoard();
  addResultText();
  addResultImages();
  addContinueListener();
  addResetListener();
}

function loadGameResultElements() {
  addGameResultListener();
}

function goToChoices() {
  window.location.assign('./choices.html');
}

function goToHome() {
  window.location.assign('./index.html');
}

function goToGameResults() {
  window.location.assign('./game-results.html');
}

function addChoiceListeners() {
  let choices = [
    select('.choice[alt="Rock"'),
    select('.choice[alt="Paper"'),
    select('.choice[alt="Scissors"')
  ];

  choices.forEach(choice => {
    const map = playDiv.querySelector(`area[alt="${choice.alt}"]`);
    map.addEventListener('click', () => {
      updateSelections(choice.alt);

      const result = playRound();
      storage.setItem('result.text', result[0]);
      storage.setItem('result.value', result[1]);

      computeScore();
    });
  });
}

function addContinueListener() {
  select('.continue').addEventListener('click', () => {
    const score = [storage.getItem('score.0'), storage.getItem('score.1')];

    if (score[0] < 5 && score[1] < 5) {
      goToChoices();
    } else {
      storage.setItem('game.result', (score[PLAYER] === 5) ? 'VICTORY' : 'DEFEAT');
      goToGameResults();
    }
  });
}

function addResetListener() {
  select('.reset').addEventListener('click', () => {
    goToHome();
  });
}

function addGameResultListener() {
  const finishButton = gameResultPanel.querySelector('button');
  finishButton.addEventListener('click', () => {
    clearPlayingArea();
    resetScore();
    toggleClickableArea(playerSelection, computerSelection);
    toggleScoreBoard();
    playDiv.appendChild(playButton);
  })
}

function addResultText() {
  const resultPanel = select('.result');
  const result = [storage.getItem('result.text'), storage.getItem('result.value')];

  resultPanel.textContent = result[0];
  resultPanel.classList.remove('result-win', 'result-lose', 'result-draw');

  let resultClass = (result[1] === WIN) ? 'result-win'
    : (result[1] === LOSE) ? 'result-lose'
      : 'result-draw';

  resultPanel.classList.add(resultClass);
}

function addResultImages() {
  const playerChoice = select('.player-choice');
  const computerChoice = select('.computer-choice');
  const playerSelection = storage.getItem('player.selection');
  const computerSelection = storage.getItem('computer.selection');

  
  playerChoice.setAttribute('alt', playerSelection);
  playerChoice.setAttribute('src', `./images/${playerSelection.toLowerCase()}.png`);

  computerChoice.setAttribute('alt', storage.getItem('computer.selection'));
  computerChoice.setAttribute('src', `./images/${computerSelection.toLowerCase()}.png`);  
}

function updateSelections(selection) {
  storage.setItem('player.selection', selection);
  storage.setItem('computer.selection', computerPlay());
}

function createScorePanel() {
  scorePanel = select('.score-board');

  [select('.player-score'), select('.computer-score')].forEach(board => {
    const table = document.createElement('table');
    for (let i = 0; i < BOARD_ROWS; i++) {
      generateDotMatrix(table, board);
    }
  });
}

function generateDotMatrix(table, board) {
  const row = document.createElement('tr');
  for (let j = 0; j < BOARD_COLS; j++) {
    appendCircles(row);
  }
  table.appendChild(row);
  board.appendChild(table);
}

function appendCircles(row) {
  const col = document.createElement('td');
  col.classList.add('col');
  const circle = document.createElement('div');
  circle.classList.add('circle');
  col.appendChild(circle);
  row.appendChild(col);
}

function clearPlayingArea(...elements) {
  let children;
  if (elements.length > 0) {
    children = Array.from(elements);
  } else {
    children = Array.from(playDiv.children).filter(node => node.tagName.toLowerCase() !== 'map');
  }

  children.forEach(child => {
    playDiv.removeChild(child);
  });
}

function resetScore() {
  storage.clear();
}

function computeScore() {
  const result = +storage.getItem('result.value');
  if (result === WIN) {
    storage.setItem('score.0', +storage.getItem('score.0') + 1);
  } else if (result === LOSE) {
    storage.setItem('score.1', +storage.getItem('score.1') + 1);
  }
  updateScoreBoard();
}

function createZero() {
  return drawVLines(drawHLines([], [1, 0, 1]), [1, 1], [FULL, FULL]);
}

function createOne() {
  return drawVLines([], [0, 1], [0, FULL]);
}

function createTwo() {
  return drawVLines(drawHLines([], [1, 1, 1]), [1, 1], [SECOND_HALF, FIRST_HALF]);
}

function createThree() {
  return drawVLines(drawHLines([], [1, 1, 1], true), [0, 1], [[0, 0], FULL]);
}

function createFour() {
  return drawVLines(drawHLines([], [0, 1, 0]), [1, 1], [FIRST_HALF, FULL]);
}

function createFive() {
  return drawVLines(drawHLines([], [1, 1, 1]), [1, 1], [FIRST_HALF, SECOND_HALF]);
}

function drawHLines(matrix, mask, three = false) {
  const defaults = [0, Math.floor(BOARD_ROWS / 2) * BOARD_COLS, (BOARD_ROWS - 1) * BOARD_COLS];
  let offsets = defaults.filter((offset, i) => mask[i]);
  offsets.forEach(offset => {
    for (let i = offset; i < offset + BOARD_COLS; i++) {
      matrix[i] = true;
    }
  });

  if (three) {
    matrix[defaults[1]] = false;
  }

  return matrix;
}

function drawVLines(matrix, offsets, range) {
  offsets.forEach((offset, line) => {
    for (let i = range[line][0]; i <= range[line][1]; i += BOARD_COLS) {
      matrix[i + ((BOARD_COLS - 1) * line)] = true;
    }
  });

  return matrix;
}

function updateScoreBoard() {
  if (storage.getItem('score.0') === null) {
    storage.setItem('score.0', '0');
    storage.setItem('score.1', '0');
  }
  [select('.player-score'), select('.computer-score')].forEach((board, index) => {
    const matrix = getMatrix(storage.getItem(`score.${index}`));
    Array.from(board.querySelectorAll('.circle')).forEach((cell, i) => {
      cell.classList.remove('on');
      if (matrix[i]) {
        cell.classList.toggle('on');
      }
    });
  });
}

function getMatrix(score) {
  switch (+score) {
    case 0:
      return createZero();
      break;
    case 1:
      return createOne();
      break;
    case 2:
      return createTwo();
      break;
    case 3:
      return createThree();
      break;
    case 4:
      return createFour();
      break;
    case 5:
      return createFive();
      break;
  }
}

function computerPlay() {
  const choices = ['Rock', 'Paper', 'Scissors'];
  return choices[Math.floor(Math.random() * 3)];
}


function playRound() {
  const playerSelection = storage.getItem('player.selection');
  const computerSelection = storage.getItem('computer.selection');

  switch (playerSelection) {
    case 'Rock':
      return (computerSelection === 'Rock') ? ['You Draw! Both chose Rock', DRAW]
        : (computerSelection === 'Scissors') ? ['You Win! Rock beats Scissors', WIN]
          : ['You Lose! Paper beats Rock', LOSE];
      break;

    case 'Paper':
      return (computerSelection === 'Rock') ? ['You Win! Paper beats Rock', WIN]
        : (computerSelection === 'Scissors') ? ['You Lose! Scissors beats Paper', LOSE]
          : ['You Draw! Both chose Paper', DRAW];
      break;

    case 'Scissors':
      return (computerSelection === 'Rock') ? ['You Lose! Rock beats Scissors', LOSE]
        : (computerSelection === 'Scissors') ? ['You Draw! Both chose Scissors', DRAW]
          : ['You Win! Scissors beats Paper', WIN];
      break;

    default:
      return `You have to choose between Rock, Paper and Scissors!`;
  }
}