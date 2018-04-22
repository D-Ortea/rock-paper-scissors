const BOARD_ROWS = 7;
const BOARD_COLS = 5;

const FULL = [0, BOARD_ROWS * BOARD_COLS - BOARD_COLS];
const FIRST_HALF = [0, Math.floor(BOARD_ROWS / 2) * BOARD_COLS];
const SECOND_HALF = [Math.floor(BOARD_ROWS / 2) * BOARD_COLS, BOARD_ROWS * BOARD_COLS - BOARD_COLS];

const storage = window.sessionStorage;
const select = (str) => document.querySelector(str);

function createScorePanel() {
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

const ROWS = 7;
const COLS = 5;
const MIN_ROWS = 5;
const MIN_COLS = 3;

function createZero() {
  return scaleMatrix([
    1 , 1 , 1,
    1 , 0 , 1,
    1 , 0 , 1,
    1 , 0 , 1,
    1 , 1 , 1
  ]);
}

function createOne() {
  return scaleMatrix([
    0 , 0 , 1,
    0 , 0 , 1,
    0 , 0 , 1,
    0 , 0 , 1,
    0 , 0 , 1
  ]);
}

function createTwo() {
  return scaleMatrix([
    1 , 1 , 1,
    0 , 0 , 1,
    1 , 1 , 1,
    1 , 0 , 0,
    1 , 1 , 1
  ]);
}

function createThree() {
  return scaleMatrix([
    1 , 1 , 1,
    0 , 0 , 1,
    0 , 1 , 1,
    0 , 0 , 1,
    1 , 1 , 1
  ]);
}

function createFour() {
  return scaleMatrix([
    1 , 0 , 1,
    1 , 0 , 1,
    1 , 1 , 1,
    0 , 0 , 1,
    0 , 0 , 1
  ]);
}

function createFive() {
  return scaleMatrix([
    1 , 1 , 1,
    1 , 0 , 0,
    1 , 1 , 1,
    0 , 0 , 1,
    1 , 1 , 1
  ]);
}

function scaleMatrix(matrix) {
  let newMatrix = [];
  for(let i = 0; i < matrix.length; i++) {
    newMatrix[calcNewIndex(i)] = matrix[i];
  }
  fillGaps(newMatrix);
  return newMatrix;
}

function calcNewIndex(offset) {
  let x, y, xPrime, yPrime;
  [x, y] = [ Math.floor(offset / MIN_COLS) + 1 , offset % MIN_COLS + 1 ];
  [xPrime, yPrime] = [ Math.floor( x * ROWS / MIN_ROWS ) - 1, Math.floor( y * COLS / MIN_COLS ) - 1];
  return xPrime * COLS + yPrime;
}

function fillGaps(matrix) {
  for(let i=0; i < matrix.length; i++) {
    if( matrix[i] === undefined ) {
      let calc = Math.floor( COLS / 2 ) + Math.floor(i / COLS) * COLS;
      const middleElem = matrix[calc];
      matrix[i] = middleElem;
    }
  }
  for(let i=0; i < matrix.length; i++) {
    if( matrix[i] === undefined ) {
      matrix[i] = matrix[i - COLS];
    }
  }
}