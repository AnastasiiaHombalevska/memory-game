const cards = [
  {
    id: 1,
    image: '../src/images/18.01.58.png',
  },
  {
    id: 2,
    image: '../src/images/18.02.18.png',
  },
  {
    id: 3,
    image: '../src/images/18.02.34.png',
  },
  {
    id: 4,
    image: '../src/images/18.02.49.png',
  },
  {
    id: 5,
    image: '../src/images/18.03.23.png',
  },
  {
    id: 6,
    image: '../src/images/18.03.46.png',
  },
  {
    id: 7,
    image: '../src/images/18.04.00.png',
  },
  {
    id: 8,
    image: '../src/images/18.04.16.png',
  },
];

const gameData = {
  isGameActive: true,
  cardPair: [],
  mismatchTimerId: null,
  moves: 0,
  matchedPairs: 0,
  seconds: 0,
  gameTimerId: null,
};

const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];

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

  const winMovesItem = createNewElement('li', 'modal__item');
  winMovesItem.textContent = 'Your moves: ';
  const winInfoMoves = createNewElement('span', 'modal__data moves');
  winMovesItem.append(winInfoMoves);

  const winTimeItem = createNewElement('li', 'modal__item');
  winTimeItem.textContent = 'Your time: ';
  const winInfoTime = createNewElement('span', 'modal__data time');
  winTimeItem.append(winInfoTime);

  winInfoList.append(winMovesItem);
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

  leaderboardModalWrapper.append(leaderboardModalTitle);
  leaderboardModalWrapper.append(leaderboardInfo);
  leaderboardModal.append(leaderboardModalWrapper);

  document.body.append(winModal);
  document.body.append(leaderboardModal);

  // cards
  function addImagesToCards(cardsArray) {
    const cardElements = gameBoardWrapper.children;

    cardsArray.forEach((card, index) => {
      const image = createNewElement('img', 'card__img');

      image.src = card.image;
      image.alt = 'card image';

      cardElements[index].dataset.cardId = card.id;
      cardElements[index].replaceChildren(image);
      cardElements[index].classList.remove('is-visible');
    });
  }

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

  // update timer UI
  function updateGameTimer() {
    const minutes = Math.floor(gameData.seconds / 60);
    const remainingSeconds = gameData.seconds % 60;

    gameTimer.textContent = `${String(minutes).padStart(2, '0')}:${String(
      remainingSeconds
    ).padStart(2, '0')}`;
  }

  // game timer
  function startGameTimer() {
    clearInterval(gameData.gameTimerId);

    gameData.seconds = 0;
    updateGameTimer();

    gameData.gameTimerId = setInterval(() => {
      gameData.seconds++;
      updateGameTimer();
    }, 1000);
  }

  // starts new game
  function startNewGame() {
    clearInterval(gameData.gameTimerId);
    clearTimeout(gameData.mismatchTimerId);

    gameData.isGameActive = true;
    gameData.cardPair = [];
    gameData.mismatchTimerId = null;
    gameData.moves = 0;
    gameData.matchedPairs = 0;
    gameData.seconds = 0;
    gameData.gameTimerId = null;

    gameInfoMoves.textContent = '0';
    gameInfoPairs.textContent = '0 / 8';

    shuffleCards(gameBordCards);
    addImagesToCards(gameBordCards);
    startGameTimer();
  }

  // card click
  gameBoardWrapper.addEventListener('click', function (event) {
    const card = event.target.closest('.card');

    if (
      !card ||
      !gameData.isGameActive ||
      gameData.mismatchTimerId !== null ||
      gameData.cardPair.includes(card) ||
      card.classList.contains('matched')
    ) {
      return;
    }

    gameData.moves++;
    gameInfoMoves.textContent = gameData.moves;
    card.classList.add('is-visible');
    checkTwoCards(card);
  });

  // start new game button
  startNewGameBtn.addEventListener('click', startNewGame);

  leaderboardBtn.addEventListener('click', () => {
    renderLeaderboard();
    leaderboardModal.classList.add('is-active');
  });

  function checkTwoCards(card) {
    gameData.cardPair.push(card);

    if (gameData.cardPair.length < 2) {
      return;
    }

    if (
      gameData.cardPair[0].dataset.cardId ===
      gameData.cardPair[1].dataset.cardId
    ) {
      gameData.cardPair[0].classList.add('matched');
      gameData.cardPair[1].classList.add('matched');

      gameData.matchedPairs += 1;
      gameInfoPairs.textContent = ` ${gameData.matchedPairs} / 8`;

      gameData.cardPair = [];
    } else {
      gameData.mismatchTimerId = setTimeout(() => {
        gameData.cardPair[0].classList.remove('is-visible');
        gameData.cardPair[1].classList.remove('is-visible');

        gameData.cardPair = [];
        gameData.mismatchTimerId = null;
      }, 1500);
    }

    if (gameData.matchedPairs === cards.length) {
      endGame();
    }
  }

  function saveGameResult() {
    const gameResult = {
      moves: gameData.moves,
      time: gameData.seconds,
    };

    leaderboard.push(gameResult);
    leaderboard.sort((a, b) => a.time - b.time);

    if (leaderboard.length > 10) {
      leaderboard.length = 10;
    }

    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
  }

  function renderLeaderboard() {
    leaderboardInfo.replaceChildren();

    leaderboard.forEach((result) => {
      const leaderboardItem = createNewElement('li', 'modal__item');

      const leaderboardMoves = createNewElement('span', 'leaderbord__moves');
      leaderboardMoves.textContent = `Moves: ${result.moves}`;

      const leaderboardTime = createNewElement('span', 'leaderbord__time');

      const minutes = Math.floor(result.time / 60);
      const remainingSeconds = result.time % 60;

      leaderboardTime.textContent = ` / Time: ${String(minutes).padStart(
        2,
        '0'
      )}:${String(remainingSeconds).padStart(2, '0')}`;

      leaderboardItem.append(leaderboardMoves);
      leaderboardItem.append(leaderboardTime);
      leaderboardInfo.append(leaderboardItem);
    });
  }

  function showWinGameModal() {
    const winModalItemMoves = document.querySelector('.win .modal__data.moves');
    const winModalItemTime = document.querySelector('.win .modal__data.time');

    winModalItemMoves.textContent = gameData.moves;

    const minutes = Math.floor(gameData.seconds / 60);
    const remainingSeconds = gameData.seconds % 60;

    winModalItemTime.textContent = `${String(minutes).padStart(
      2,
      '0'
    )}:${String(remainingSeconds).padStart(2, '0')}`;

    winModal.classList.add('is-active');
  }

  function endGame() {
    if (!gameData.isGameActive) {
      return;
    }

    gameData.isGameActive = false;

    clearInterval(gameData.gameTimerId);
    gameData.gameTimerId = null;

    saveGameResult();
    showWinGameModal();
  }

  const modals = document.querySelectorAll('.modal');

  modals.forEach((modal) => {
    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.classList.remove('is-active');
      }
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      modals.forEach((modal) => {
        modal.classList.remove('is-active');
      });
    }
  });

  startNewGame();
});
