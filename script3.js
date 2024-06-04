let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let player1 = "Player 1";
let player2 = "Player 2";
let vsComputer = false;

function handleClick(index) {
  if (board[index] === "" && gameActive) {
    board[index] = currentPlayer;
    renderBoard();
    checkGameStatus();
    if (vsComputer && gameActive) {
      setTimeout(computerMove, 500);
    }
  }
}

function computerMove() {
  let availableMoves = [];
  for (let i = 0; i < board.length; i++) {
    if (board[i] === "") {
      availableMoves.push(i);
    }
  }
  let randomIndex = Math.floor(Math.random() * availableMoves.length);
  handleClick(availableMoves[randomIndex]);
}

function checkGameStatus() {
  let winner = checkWinner();
  if (winner) {
    gameActive = false;
    document.getElementById("status").innerText = `${winner} wins!`;
  } else if (!board.includes("")) {
    gameActive = false;
    document.getElementById("status").innerText = "It's a draw!";
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    document.getElementById(
      "status"
    ).innerText = `Player ${currentPlayer}'s Turn`;
  }
}

function checkWinner() {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];
  for (let condition of winConditions) {
    let [a, b, c] = condition;
    if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

function renderBoard() {
  for (let i = 0; i < board.length; i++) {
    document.getElementsByClassName("cell")[i].innerText = board[i];
  }
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  document.getElementById(
    "status"
  ).innerText = `Player ${currentPlayer}'s Turn`;
  renderBoard();
}

function updatePlayerNames() {
  player1 = document.getElementById("player1").value || "Player 1";
  player2 = document.getElementById("player2").value || "Player 2";
}

function toggleComputer() {
  vsComputer = document.getElementById("vsComputer").checked;
}
