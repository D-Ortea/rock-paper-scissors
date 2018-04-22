function loadChoicesElements() {
  createScorePanel();
  addChoiceListeners();
  updateScoreBoard();
}


function addChoiceListeners() {
  let choices = [
    select('.choice[alt="Rock"'),
    select('.choice[alt="Paper"'),
    select('.choice[alt="Scissors"')
  ];

  choices.forEach(choice => {
    const map = select(`area[alt="${choice.alt}"]`);
    map.addEventListener('click', () => {
      updateSelections(choice.alt);
      
      const result = playRound();
      storage.setItem('result.text', result[0]);
      storage.setItem('result.value', result[1]);
      
      computeScore();
    });
  });
}

function updateSelections(selection) {
  storage.setItem('player.selection', selection);
  storage.setItem('computer.selection', computerPlay());
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

loadChoicesElements();