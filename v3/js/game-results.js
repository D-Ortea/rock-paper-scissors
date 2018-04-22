function loadGameResultElements() {
  createScorePanel();
  updateScoreBoard();
  const gameResult = storage.getItem('game.result');
  select('.game-result').textContent = gameResult;
  select('.game-result').classList.add(gameResult.toLowerCase());
  addGameResultListener();
}

function addGameResultListener() {
  select('.game-result-button').addEventListener('click', () => {
    goToHome();
  });
}

function goToHome() {
  window.location.assign('../index.html');
}

loadGameResultElements();