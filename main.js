//DOM elements
const playDiv = document.querySelector('#playing-area');
const playButton = document.querySelector('.play');
let rock, paper, scissors;
addPlayButtonListener();

function addPlayButtonListener() {
  playButton.addEventListener('click', () => {
    clearPlayingArea();
    displayOptionSelection();
    playDiv.appendChild(rock);
    playDiv.appendChild(paper);
    playDiv.appendChild(scissors);
  });
}

function displayOptionSelection() {
  [rock, paper, scissors] = createChoiceImages('Rock', 'Paper', 'Scissors');
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

function clearPlayingArea() {
  const children = Array.from(playDiv.children);
  children.forEach(child => {
    playDiv.removeChild(child);
  });
}