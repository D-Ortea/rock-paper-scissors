//DOM elements
const playDiv = document.querySelector('#playing-area');
const scoreDiv = document.querySelector('#score');
const playButton = document.querySelector('.play');
let continueButton, resetButton;
let rock, paper, scissors;

let playerSelection, computerSelection;
let score = [0, 0];

createElements();
addListeners();


function addListeners() {
  addPlayButtonListener();
  addChoiceListeners();
  addContinueListener();
  addResetListener();  
}

function createElements() {  
  createOptionSelection();
  createContinueAndResetButtons();
}

function addPlayButtonListener() {
  playButton.addEventListener('click', () => {
    clearPlayingArea(playButton);
    playDiv.appendChild(rock);
    playDiv.appendChild(paper);
    playDiv.appendChild(scissors);
  });
}

function addChoiceListeners() {  
  let choices = [rock, paper, scissors];
  choices.forEach(choice => {
    const map = playDiv.querySelector( `area[alt="${choice.alt}"]` );
    map.addEventListener('click', () => {
      clearPlayingArea( ...choices.filter(elem => elem !== choice ));
      updateSelections( choice.alt );

      appendVSElement();
      appendComputerSelectionImage( choices );

      const result = playRound();

      appendResultElement( result );
      appendNavOptionButtons();
      
    });
  });
}

function addContinueListener() {
  continueButton.addEventListener('click', () => {
    if( score[0] < 5 && score[1] < 5 ) {
      clearPlayingArea();

    } else {

    }
  });
}

function addResetListener() {

}

function appendNavOptionButtons() { 
    playDiv.appendChild(continueButton);
    playDiv.appendChild(resetButton);
}

function appendResultElement( result ) {
  const p = document.createElement('p');
  p.textContent = result;
  playDiv.appendChild(p);
}

function appendComputerSelectionImage( choices ) {
  playDiv.appendChild(choices.find(elem => elem.alt === computerSelection).cloneNode(true));  
}

function updateSelections( selection ) {
  playerSelection = selection;
  computerSelection = computerPlay();
}

function appendVSElement() {
  const vs = document.createElement('h1');
  vs.textContent = 'VS';
  playDiv.appendChild(vs);
}

function createOptionSelection() {
  [rock, paper, scissors] = createChoiceImages('Rock', 'Paper', 'Scissors');  
}

function createContinueAndResetButtons() {
  const buttonText = ['Continue', 'Reset'];
  [continueButton, resetButton] = buttonText.map(text => {
    const button = document.createElement('button');
    button.textContent = text;
    button.classList.add(text.toLowerCase());
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
  area.coords = '82,82,82';
  area.alt = alt;
  area.href = '#';

  map.appendChild(area);
  playDiv.appendChild(map);
}

function clearPlayingArea(...elements) {
  let children;
  if(elements) {
    children = Array.from(elements);
  } else {
    children = Array.from(playDiv.querySelectorAll('img, h1, p, button'));
  }
    
  children.forEach(child => {
    playDiv.removeChild(child);
  });
}


function computerPlay() {
  const choices = ['Rock', 'Paper', 'Scissors'];
  return choices[Math.floor(Math.random() * 3)];
}


function playRound() {
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