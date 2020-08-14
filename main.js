const Player = (name, marker) => {
  const movements = [];
  let score = 0;
  return { name, marker, movements, score };
};

const player1 = Player("Ginner", "G");
const player2 = Player("Lucia", "L");

const DOM = (() => {
  const _container = document.getElementById("container");
  const _board = document.getElementById("board");
  return { _container, _board };
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
  const boardCards = [
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
  const playedSpots = [];
  const renderBoardCards = () => {
    for (card of boardCards) {
      const div = document.createElement("div");
      div.className = card.class;
      div.id = card.id;
      DOM._board.appendChild(div);
    }
  };

  return { renderBoardCards, playedSpots, winningCombos };
})();

const displayGameInfo = (() => {
  const renderDisplay = () => {
    const displayHTML = `
      <div class="game-info">
        <p>${player1.name}</p>
        <p>current player</p>
        <p>${player2.name}</p>
      </div>
      <div class="game-info" id="scores">
        <p class="score">${player1.score}</p>
        <p class="current-player">${gameLogic.currentPlayer.name}</p>
        <p class="score">${player1.score}</p>
      </div>
    `;
    DOM._container.insertAdjacentHTML("afterbegin", displayHTML);
  };
  return { renderDisplay };
})();

const gameLogic = (() => {
  let currentPlayer = player1;

  const changeCurrentPlayer = () => {
    currentPlayer === player1
      ? (currentPlayer = player2)
      : (currentPlayer = player1);
  };

  const checkIfWinner = (arr) => {};

  //dom manupulation and logic. Must be simplified
  DOM._board.addEventListener("click", (e) => {
    if (e.target.className.includes("gradient")) {
      return;
    }
    if (e.target.className.includes("board-card")) {
      let gradient =
        currentPlayer === player1 ? "orange-gradient" : "green-gradient";

      e.target.classList.add(gradient);
      e.target.innerText = currentPlayer.marker;

      board.playedSpots.push(e.target.id);
      currentPlayer.movements.push(e.target.id);
      checkIfWinner(board.winningCombos);
      changeCurrentPlayer();
    }
  });

  return { changeCurrentPlayer, currentPlayer };
})();

displayGameInfo.renderDisplay();
board.renderBoardCards();
