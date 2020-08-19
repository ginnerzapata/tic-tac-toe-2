const DEAFULTBOARD = [
  { class: "board-card", id: "0" },
  { class: "board-card", id: "1" },
  { class: "board-card", id: "2" },
  { class: "board-card", id: "3" },
  { class: "board-card", id: "4" },
  { class: "board-card", id: "5" },
  { class: "board-card", id: "6" },
  { class: "board-card", id: "7" },
  { class: "board-card", id: "8" },
];

const Player = (name) => {
  const movements = [];
  let score = 0;
  marker = name[0].toUpperCase();
  return { name, marker, movements, score };
};

const DOM = (() => {
  const _container = document.getElementById("container");
  //const _board = document.getElementById("board");
  return { _container };
})();

const board = (() => {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  let boardCards = [...DEAFULTBOARD];
  const playedSpots = [];
  const renderBoardCards = () => {
    const _board = document.createElement("div");
    _board.id = "board";
    for (card of boardCards) {
      const div = document.createElement("div");
      div.className = card.class;
      div.id = card.id;
      _board.appendChild(div);
    }
    DOM._container.appendChild(_board);
  };
  const reset = () => {
    const { player1, player2 } = gameLogic.getConfig();

    board.playedSpots.length = 0;
    player1.movements.length = 0;
    player2.movements.length = 0;
    DOM._container.innerHTML = "";
    boardCards = [...DEAFULTBOARD];
  };

  return { renderBoardCards, playedSpots, winningCombos, reset };
})();

const displayGameInfo = (() => {
  const renderDisplay = () => {
    const { currentPlayer, player1, player2 } = gameLogic.getConfig();
    const displayHTML = `
      <div class="game-info">
        <p>${player1.name}</p>
        <p>Current player</p>
        <p>${player2.name}</p>
      </div>
      <div class="game-info" id="scores">
        <p class="score">${player1.score}</p>
        <p class="current-player">${currentPlayer.name}</p>
        <p class="score">${player2.score}</p>
      </div>
    `;
    DOM._container.insertAdjacentHTML("afterbegin", displayHTML);
  };
  return { renderDisplay };
})();

const gameLogic = (() => {
  let config = {};

  DOM._container.addEventListener("submit", (e) => {
    e.preventDefault();
    gameLogic.newGame();
  });

  const changeCurrentPlayer = () => {
    config.currentPlayer === config.player1
      ? (config.currentPlayer = config.player2)
      : (config.currentPlayer = config.player1);
    if (DOM._container.querySelector(".current-player")) {
      DOM._container.querySelector(".current-player").innerText =
        config.currentPlayer.name;
    }
  };

  const checkIfWinner = (arr) => {
    for (combo of arr) {
      if (combo.every((n) => config.currentPlayer.movements.includes(n)))
        return true;
    }
  };
  //dom manupulation and logic. Must be simplified

  DOM._container.addEventListener("click", (e) => {
    if (e.target.className.includes("gradient")) {
      return;
    }
    if (e.target.tagName === "BUTTON") {
      gameLogic.newRound();
    }
    if (e.target.className.includes("board-card")) {
      let gradient =
        config.currentPlayer === config.player1
          ? "orange-gradient"
          : "green-gradient";

      e.target.classList.add(gradient);
      e.target.innerText = config.currentPlayer.marker;

      board.playedSpots.push(+e.target.id);
      config.currentPlayer.movements.push(+e.target.id);
      if (!checkIfWinner(board.winningCombos) && board.playedSpots.length >= 9)
        draw();
      if (checkIfWinner(board.winningCombos)) {
        win();
      }
      changeCurrentPlayer();
    }
  });

  const draw = () => {
    DOM._container.innerHTML = `
    <img src="img/draw.svg" alt="trophy" />
    <h1 class='result'>It's a draw</h1>
    <button >Play Again</button>`;
  };
  const win = () => {
    config.currentPlayer.score++;
    DOM._container.innerHTML = `
    <img src="img/winner.svg" alt="trophy" />
    <h1 class='result'>${config.currentPlayer.name} Wins</h1>
    <button >Play Again</button>`;
  };
  const setConfig = () => {
    const p1 = document.getElementById("player1");
    const p2 = document.getElementById("player2");
    const player1 = Player(p1.value);
    const player2 = Player(p2.value);

    config = { player1, player2, currentPlayer: player1 };
  };
  const newGame = () => {
    setConfig();
    board.reset();
    displayGameInfo.renderDisplay();
    board.renderBoardCards();
  };

  const newRound = () => {
    board.reset();
    displayGameInfo.renderDisplay();
    board.renderBoardCards();
  };
  const getConfig = () => config;

  return {
    changeCurrentPlayer,
    newGame,
    getConfig,
    newRound,
  };
})();

const form = (() => {
  const formHTML = `
  <form id="form">
    <input
      type="text"
      name="player-name"
      id="player1"
      placeholder="Player 1 name"
      value="Player 1"
    />
    <input
      type="text"
      name="player-name"
      id="player2"
      placeholder="Player 2 name"
      value="Player 2"
    />
    <p>Leave in blank to get default values</p>
    <input type="submit" value="Start game" />
</form>`;

  const render = () => {
    DOM._container.insertAdjacentHTML("afterbegin", formHTML);
  };
  return { render };
})();
form.render();
