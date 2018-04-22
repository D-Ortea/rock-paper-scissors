//DOM elements
const playDiv = document.querySelector('#playing-area');
const scoreDiv = document.querySelector('#container').querySelector('div');
const playButton = document.querySelector('.play');
let playerBoard, computerBoard;
let scorePanel, resultPanel, gameResultPanel;
let continueButton, resetButton;
let rock, paper, scissors;

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
let playerSelection, computerSelection;
let score = [0, 0];


// createElements();
// addListeners();

function createElements() {
  createScorePanel();
  createOptionSelection();
  createContinueAndResetButtons();
  createResultPanel();
  createGameResultPanel();
}

function addListeners() {
  addPlayButtonListener();
  addChoiceListeners();
  addContinueListener();
  addResetListener();
  addGameResultListener();
}

function goToChoices() {
  window.location.assign('./choices.html');
}

function addChoiceListeners() {
  let choices = [rock, paper, scissors];
  choices.forEach(choice => {
    const map = playDiv.querySelector(`area[alt="${choice.alt}"]`);
    map.addEventListener('click', () => {
      clearPlayingArea();
      updateSelections(choice.alt);

      const computerSelection = getComputerSelectionImage(choices);

      toggleClickableArea(choice.alt, computerSelection.alt);

      playDiv.appendChild(
        surroundWithTable(
          choice, getVSElement(), computerSelection
        ));

      const result = playRound();

      computeScore(result[1]);

      appendResultElement(result);
      appendNavOptionButtons();

    });
  });
}

function addContinueListener() {
  continueButton.addEventListener('click', () => {
    const table = playDiv.querySelector('table');
    clearPlayingArea();
    if (score[0] < 5 && score[1] < 5) {
      appendChoiceImages();
      toggleClickableArea(playerSelection, computerSelection);
    } else {
      const p = gameResultPanel.querySelector('p');
      const result = (score[PLAYER] === 5) ? 'VICTORY' : 'DEFEAT';
      p.textContent = result;
      gameResultPanel.classList.add(result.toLowerCase());
      playDiv.appendChild(gameResultPanel);
    }
  });
}

function addResetListener() {
  resetButton.addEventListener('click', () => {
    clearPlayingArea();
    resetScore();
    toggleClickableArea(playerSelection, computerSelection);
    toggleScoreBoard();
    playDiv.appendChild(playButton);
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

function appendNavOptionButtons() {
  playDiv.appendChild(continueButton);
  playDiv.appendChild(resetButton);
}

function appendResultElement(result) {
  resultPanel.textContent = result[0];
  resultPanel.classList.add('result');
  resultPanel.classList.remove('result-win', 'result-lose', 'result-draw');
  let resultClass = (result[1] === WIN) ? 'result-win'
    : (result[1] === LOSE) ? 'result-lose'
      : 'result-draw';

  resultPanel.classList.add(resultClass);
  playDiv.appendChild(resultPanel);
}

function getComputerSelectionImage(choices) {
  return choices.find(elem => elem.alt === computerSelection).cloneNode(true);
}

function updateSelections(selection) {
  playerSelection = selection;
  computerSelection = computerPlay();
}

function getVSElement() {
  const vs = document.createElement('h1');
  vs.textContent = 'VS';
  vs.classList.add('vs');
  return vs;
}

function createScorePanel() {
  scorePanel = document.querySelector('.score-board');
  playerBoard = document.querySelector('.player-score');
  computerBoard = document.querySelector('.computer-score');

  [playerBoard, computerBoard].forEach(board => {
    const table = document.createElement('table');
    for (let i = 0; i < BOARD_ROWS; i++) {
      const row = document.createElement('tr');
      for (let j = 0; j < BOARD_COLS; j++) {
        const col = document.createElement('td');
        col.classList.add('col');
        const circle = document.createElement('div');
        circle.classList.add('circle');
        col.appendChild(circle);
        row.appendChild(col);
      }
      table.appendChild(row);
    }
    board.appendChild(table);
  });
}

function createOptionSelection() {
  [rock, paper, scissors] = createChoiceImages('Rock', 'Paper', 'Scissors');
}

function createContinueAndResetButtons() {
  const buttonText = ['CONTINUE', 'RESET'];
  [continueButton, resetButton] = buttonText.map(text => {
    const button = document.createElement('button');
    button.textContent = text;
    button.classList.add(text.toLowerCase(), 'action-btn');
    return button
  });
}

function createChoiceImages(...choices) {
  const choiceArray = Array.from(choices);
  const choiceImages = choiceArray.map(choice => {
    const image = document.createElement('img');
    image.classList.add('choice');
    image.src = `./images/${choice.toLowerCase()}.png`;
    image.alt = choice;

    createMap(choice);
    image.useMap = `#choiceMap${choice}`;
    return image;
  });

  return choiceImages;
}

function createMap(alt) {
  const map = document.createElement('map');
  map.name = `choiceMap${alt}`;

  const area = document.createElement('area');
  area.shape = 'circle';
  area.coords = '82,82,72';
  area.alt = alt;
  area.classList.add('area');

  map.appendChild(area);
  playDiv.appendChild(map);
}

function createResultPanel() {
  resultPanel = document.createElement('p');
}

function createGameResultPanel() {
  gameResultPanel = document.createElement('div');
  const p = document.createElement('p');
  const button = document.createElement('button');

  p.classList.add('game-result');
  button.classList.add('game-result-button');
  button.textContent = 'FINISH';

  gameResultPanel.appendChild(p);
  gameResultPanel.appendChild(button);
}

function toggleScoreBoard() {
  if (scoreDiv.id) {
    scoreDiv.id = '';
    scoreDiv.removeChild(scorePanel);
  } else {
    scoreDiv.id = 'score';
    scoreDiv.appendChild(scorePanel);
  }
}

function toggleClickableArea(playerSelection, computerSelection) {
  const playerArea = playDiv.querySelector(`area[alt="${playerSelection}"]`);
  const computerArea = playDiv.querySelector(`area[alt="${computerSelection}"]`);

  switchCoords(playerArea);

  if (computerSelection !== playerSelection) {
    switchCoords(computerArea);
  }
}

function switchCoords(area) {
  if (area.getAttribute('coords') === '0, 0, 0') {
    area.setAttribute('coords', '82, 82, 72');
  } else {
    area.setAttribute('coords', '0, 0, 0');
  }
}

function surroundWithTable(playerChoice, vs, computerChoice) {
  const table = document.createElement('table');
  const tr = document.createElement('tr');
  [playerChoice, vs, computerChoice].forEach(elem => {
    const td = document.createElement('td');
    td.appendChild(elem);
    if (elem.tagName.toLowerCase() === 'h1') {
      td.setAttribute('width', '164px');
    }
    tr.appendChild(td);
  });
  table.appendChild(tr);
  table.setAttribute('align', 'center');
  return table;
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
  score = [0, 0];
  updateScoreBoard();
}

function computeScore(result) {
  const scoreArray = Array.from(scorePanel.children);
  if (result === WIN) {
    score[PLAYER]++;
  } else if (result === LOSE) {
    score[COMPUTER]++;
  }
  updateScoreBoard();
}

function createZero() {
  return drawVLines(drawHLines([], [1, 0 ,1]), [1, 1], [FULL, FULL]);
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
    for (let i = range[line][0]; i <= range[line][1]; i+=BOARD_COLS) {
      matrix[i + ((BOARD_COLS - 1) * line)] = true;
    }
  });

  return matrix;
}

function updateScoreBoard() {
  [playerBoard, computerBoard].forEach((board, index) => {
    const matrix = getMatrix(score[index]);
    Array.from(board.querySelectorAll('.circle')).forEach((cell, i) => {
      cell.classList.remove('on');
      if (matrix[i]) {
        cell.classList.toggle('on');
      }
    });
  });
}

function getMatrix(score) {
  switch (score) {
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
  playerSelection = normalizeSelection(playerSelection);
  computerSelection = normalizeSelection(computerSelection);

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

function normalizeSelection(str) {
  const lowerCase = str.toLowerCase();
  return lowerCase.replace(lowerCase.charAt(0), lowerCase.charAt(0).toUpperCase());
}