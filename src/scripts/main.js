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

  const leaderboardBtn = createNewElement(
    'button',
    'btn header__btn header__btn--leaderboard'
  );
  startNewGameBtn.textContent = 'Leaderboard';

  header.append(headerContainer);
  headerContainer.append(startNewGameBtn);
  headerContainer.append(leaderboardBtn);
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