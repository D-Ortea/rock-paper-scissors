function computerPlay() {
  const choices = ['Rock', 'Paper', 'Scissors'];
  return choices[Math.floor(Math.random() * 3)];
}


function singleRound(playerSelection, computerSelection) {
  playerSelection = normalizeSelection(playerSelection);
  computerSelection = normalizeSelection(computerSelection);

  switch(playerSelection) {
    case 'Rock':
      return (computerSelection === 'Rock') ? 'You Draw! Both chose Rock'
           : (computerSelection === 'Scissors') ? 'You Win! Rock beats Scissors'
           : 'You Lose! Paper beats Rock';
      break;

    case 'Paper':
      return (computerSelection === 'Rock') ? 'You Win! Paper beats Rock'
           : (computerSelection === 'Scissors') ? 'You Lose! Scissors beats Paper'
           : 'You Draw! Both chose Paper';
      break;

    case 'Scissors':
      return (computerSelection === 'Rock') ? 'You Lose! Rock beats Scissors'
           : (computerSelection === 'Scissors') ? 'You Draw! Both chose Scissors'
           : 'You Win! Scissors beats Paper';
      break;

    default:
      return `You have to choose between Rock, Paper and Scissors!`;
  }
}

function normalizeSelection(str) {
  const lowerCase = str.toLowerCase();
  return lowerCase.replace(lowerCase.charAt(0), lowerCase.charAt(0).toUpperCase());
}

function game() {
  for(let i=0; i < 5; i++) {
    let playerSelection = prompt("Rock, Paper and Scissors!");
    let computerSelection = computerPlay();
    console.log(singleRound(playerSelection, computerSelection));
  }
}

