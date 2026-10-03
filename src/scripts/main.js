const cards = [
  '../src/images/18.01.58.png',
  '../src/images/18.02.18.png',
  '../src/images/18.02.34.png',
  '../src/images/18.02.49.png',
  '../src/images/18.03.23.png',
  '../src/images/18.03.46.png',
  '../src/images/18.04.00.png',
  '../src/images/18.04.16.png',
];

document.addEventListener('DOMContentLoaded', function () {
  function createNewElement(element, className) {
    const newElement = document.createElement(element);
    newElement.classList.add(...className.split(' '));

    switch (element) {
      case 'button':
        newElement.type = 'button';
    }

    return newElement;
  }

  // header section
  const header = createNewElement('header', 'header');
  const headerContainer = createNewElement('div', 'header__container');

  const startNewGameBtn = createNewElement(
    'button',
    'btn header__btn header__btn--start'
  );
  startNewGameBtn.textContent = 'Start New Game';

  const gameInfoContainer = createNewElement('div', 'game-info');

  // Moves
  const movesItem = createNewElement('div', 'game-info__item');
  const movesLabel = createNewElement('span', 'game-info__label');
  movesLabel.textContent = 'Moves';
  const gameInfoMoves = createNewElement('span', 'game-info__value moves');
  gameInfoMoves.textContent = '0';
  movesItem.append(movesLabel);
  movesItem.append(gameInfoMoves);

  // Time
  const timeItem = createNewElement('div', 'game-info__item');
  const timeLabel = createNewElement('span', 'game-info__label');
  timeLabel.textContent = 'Time';
  const gameTimer = createNewElement('span', 'game-info__value game-timer');
  gameTimer.textContent = '00:00';
  timeItem.append(timeLabel);
  timeItem.append(gameTimer);

  // Pairs
  const pairsItem = createNewElement('div', 'game-info__item');
  const pairsLabel = createNewElement('span', 'game-info__label');
  pairsLabel.textContent = 'Pairs';
  const gameInfoPairs = createNewElement('span', 'game-info__value pairs');
  gameInfoPairs.textContent = '0 / 8';
  pairsItem.append(pairsLabel);
  pairsItem.append(gameInfoPairs);

  gameInfoContainer.append(movesItem);
  gameInfoContainer.append(timeItem);
  gameInfoContainer.append(pairsItem);

  const leaderboardBtn = createNewElement(
    'button',
    'btn header__btn header__btn--leaderboard'
  );
  leaderboardBtn.textContent = 'Leaderboard';

  headerContainer.append(startNewGameBtn);
  headerContainer.append(gameInfoContainer);
  headerContainer.append(leaderboardBtn);
  header.append(headerContainer);
  document.body.append(header);
  
  // main section
  const main = createNewElement('main', 'main');
  const gameBoard = createNewElement('div', 'game-board');
  const gameBoardWrapper = createNewElement('div', 'game-board__wrapper');

  cards.forEach((card) => {
    const element = createNewElement('div', 'card');
    const image = createNewElement('img', 'card__img');

    image.src = card;
    image.alt = 'card image';

    element.append(image);
    gameBoardWrapper.append(element);
  });

  gameBoard.append(gameBoardWrapper);
  main.append(gameBoard);
  document.body.append(main);

  // modal section
})

// header
// two btn inside

// playbord
// bord with card

// win modal
//

// scorebord
// save data to local storage **game id, name, points**

// game timer

// diff cards timer 

// generate cards
// random cards position in []

// starts new game

// close game