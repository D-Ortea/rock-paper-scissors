const PLAYER = 0;
const COMPUTER = 1;

const DRAW = 0;
const WIN = 1;
const LOSE = 2;

function loadRoundResultElements() {
  createScorePanel();
  updateScoreBoard();
  addResultText();
  addResultImages();
  addContinueListener();
  addResetListener();
}

function goToHome() {
  window.location.assign('../index.html');
}

function goToGameResults() {
  window.location.assign('../html/game-results.html');
}

function goToChoices() {
  window.location.assign('../html/choices.html');
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
  playerChoice.setAttribute('src', `../images/${playerSelection.toLowerCase()}.png`);

  computerChoice.setAttribute('alt', storage.getItem('computer.selection'));
  computerChoice.setAttribute('src', `../images/${computerSelection.toLowerCase()}.png`);  
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



loadRoundResultElements();