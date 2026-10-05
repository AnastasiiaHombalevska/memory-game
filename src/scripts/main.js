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

const gameData = {
  'new game': false,
  'score': 0,
}

const leaderboard = [];

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

  function createCardsForGame(cardsArray) {
    return cardsArray.concat(cardsArray);
  }

  const gameBordCards = createCardsForGame(cards);

  function addImagesToCards(cardsArray) {
    const cardElements = gameBoardWrapper.children;

    cardsArray.forEach((card, index) => {
      const image = createNewElement('img', 'card__img');

      image.src = card;
      image.alt = 'card image';

      cardElements[index].replaceChildren(image);
      cardElements[index].classList.remove('is-visible');
    });
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
  movesLabel.textContent = 'Moves ';
  const gameInfoMoves = createNewElement('span', 'game-info__value moves');
  gameInfoMoves.textContent = '0';
  movesItem.append(movesLabel);
  movesItem.append(gameInfoMoves);

  // Time
  const timeItem = createNewElement('div', 'game-info__item');
  const timeLabel = createNewElement('span', 'game-info__label');
  timeLabel.textContent = 'Time ';
  const gameTimer = createNewElement('span', 'game-info__value game-timer');
  gameTimer.textContent = '00:00';
  timeItem.append(timeLabel);
  timeItem.append(gameTimer);

  // Pairs
  const pairsItem = createNewElement('div', 'game-info__item');
  const pairsLabel = createNewElement('span', 'game-info__label');
  pairsLabel.textContent = 'Pairs ';
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

  gameBordCards.forEach(() => {
    const element = createNewElement('div', 'card');
    gameBoardWrapper.append(element);
  });

  gameBoard.append(gameBoardWrapper);
  main.append(gameBoard);
  document.body.append(main);

  // modal section
  // Win modal
  const winModal = createNewElement('div', 'modal win');
  const winModalWrapper = createNewElement('div', 'modal__wrapper');
  const winModalTitle = createNewElement('h2', 'modal__title');
  winModalTitle.textContent = 'You win!';

  const winInfoList = createNewElement('ul', 'modal__list');

  const winScoreItem = createNewElement('li', 'modal__item');
  winScoreItem.textContent = 'Your score: ';
  const winInfoScore = createNewElement('span', 'modal__data score');
  winScoreItem.append(winInfoScore);

  const winTimeItem = createNewElement('li', 'modal__item');
  winTimeItem.textContent = 'Your time: ';
  const winInfoTime = createNewElement('span', 'modal__data time');
  winTimeItem.append(winInfoTime);

  winInfoList.append(winScoreItem);
  winInfoList.append(winTimeItem);
  winModalWrapper.append(winModalTitle);
  winModalWrapper.append(winInfoList);
  winModal.append(winModalWrapper);

  // Leaderboard modal
  const leaderboardModal = createNewElement('div', 'modal leaderboard');
  const leaderboardModalWrapper = createNewElement('div', 'modal__wrapper');
  const leaderboardModalTitle = createNewElement('h2', 'modal__title');
  leaderboardModalTitle.textContent = 'Leaderboard';

  const leaderboardInfo = createNewElement('ol', 'modal__list');

  for (let i = 0; i < 3; i++) {
    const leaderboardItem = createNewElement('li', 'modal__item');

    const leaderboardName = createNewElement('span', 'leaderbord__name');
    leaderboardName.textContent = 'Name';

    const leaderboardScore = createNewElement('span', 'leaderbord__score');
    leaderboardScore.textContent = 'score';

    const leaderboardTime = createNewElement('span', 'leaderbord__time');
    leaderboardTime.textContent = 'time';

    leaderboardItem.append(leaderboardName);
    leaderboardItem.append(leaderboardScore);
    leaderboardItem.append(leaderboardTime);
    leaderboardInfo.append(leaderboardItem);
  }

  leaderboardModalWrapper.append(leaderboardModalTitle);
  leaderboardModalWrapper.append(leaderboardInfo);
  leaderboardModal.append(leaderboardModalWrapper);

  document.body.append(winModal);
  document.body.append(leaderboardModal);

  // header
  // add event

  // playbord
  // bord with card

  // leaderboard
  // save data to local storage **game id, name, points**
  // if the first game - **There are no leaders yet**
  // sorted list after first game

  // random cards position in []
  function shuffleCards(gameBoardCards) {
    for (let i = gameBoardCards.length - 1; i > 0; i--) {
      const randomArrayIndex = Math.floor(Math.random() * (i + 1));

      const currentCard = gameBoardCards[i];
      gameBoardCards[i] = gameBoardCards[randomArrayIndex];
      gameBoardCards[randomArrayIndex] = currentCard;
    }

    return gameBoardCards;
  }

  // starts new game
  startNewGameBtn.addEventListener('click', function () {
    shuffleCards(gameBordCards);
    addImagesToCards(gameBordCards);
    startGameTimer();
    gameData['new game'] = true;

    console.log(gameBordCards);
  });

  // game timer
  let seconds = 0;
  let gameTimerId;
  function startGameTimer() {
    clearInterval(gameTimerId);

    seconds = 0;
    updateGameTimer();

    gameTimerId = setInterval(() => {
      seconds++;
      updateGameTimer();
    }, 1000);
  }
  
  // upd timer ui
  function updateGameTimer() {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    gameTimer.textContent = `${String(minutes).padStart(2, '0')}:${String(
      remainingSeconds
    ).padStart(2, '0')}`;
  }

  // diff cards timer

  gameBoardWrapper.addEventListener('click', function (event) {
    if (!gameData['new game']) {
      return;
    }

    const card = event.target.closest('.card');

    if (!card) {
      return;
    }

    card.classList.add('is-visible');
  });

  // win game
  function showWinGameModal() {
    winModal.style.display = 'block';

    localStorage.setItem('score:', gameScore);
    localStorage.setItem('time:', gameTime);
  }

  // close game
  function endGame() {}
});
