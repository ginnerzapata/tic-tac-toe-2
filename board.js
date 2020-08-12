import form from './form.js';
 

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
  const playedSpots = [];
  const getWinningcombos = () => winningCombos;
  const scoreHTML = `
  <div class='game-info'>
    <p>Player 1</p>
    <p>current player</p>
    <p>Player 2 </p>
    </div>
    <div class='game-info'>
    <p class='score'>Player 1</p>
    <p class='current-player'>current player</p>
    <p class='score'>Player 2 </p>
  </div>
`;
  const boardHTML = `
  <div id="board">
    <div class='board-card' id="0"></div>
    <div class='board-card' id="1"></div>
    <div class='board-card' id="2"></div>
    <div class='board-card' id="3"></div>
    <div class='board-card' id="4"></div>
    <div class='board-card' id="5"></div>
    <div class='board-card' id="6"></div>
    <div class='board-card' id="7"></div>
    <div class='board-card' id="8"></div>
  </div>
`;
  return {};
})();

form();