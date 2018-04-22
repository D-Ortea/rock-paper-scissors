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