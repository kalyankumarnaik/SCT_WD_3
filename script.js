const board = document.getElementById('game-board');
const status = document.getElementById('status');
const resetButton = document.getElementById('reset-button');

let cells = Array(9).fill(null);
let currentPlayer = 'X';
let gameOver = false;

function renderBoard() {
  board.innerHTML = '';
  cells.forEach((cell, index) => {
    const cellElement = document.createElement('div');
    cellElement.classList.add('cell');
    cellElement.textContent = cell || '';
    cellElement.addEventListener('click', () => handleCellClick(index));
    board.appendChild(cellElement);
  });
}

function handleCellClick(index) {
  if (cells[index] || gameOver) return;

  cells[index] = currentPlayer;
  if (checkWinner()) {
    status.textContent = `${currentPlayer} wins!`;
    gameOver = true;
    return;
  }

  if (cells.every(cell => cell)) {
    status.textContent = "It's a draw!";
    gameOver = true;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  status.textContent = `${currentPlayer}'s turn`;
  renderBoard();
}

function checkWinner() {
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];

  return winningCombos.some(combo => {
    const [a, b, c] = combo;
    return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
  });
}

resetButton.addEventListener('click', () => {
  cells = Array(9).fill(null);
  currentPlayer = 'X';
  gameOver = false;
  status.textContent = "X's turn";
  renderBoard();
});

// Initialize game
status.textContent = "X's turn";
renderBoard();
