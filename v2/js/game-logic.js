const DRAW = 0;
const WIN = 1;
const LOSE = 2;

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