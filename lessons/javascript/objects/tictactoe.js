var Gameboard = (function () {
  var board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  var winningCombinations = [
    [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
    [
      [2, 0],
      [1, 1],
      [0, 2],
    ],
    [
      [0, 0],
      [1, 0],
      [2, 0],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 2],
      [1, 2],
      [2, 2],
    ],
    [
      [0, 0],
      [0, 1],
      [0, 2],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [2, 0],
      [2, 1],
      [2, 2],
    ],
  ];
  var gameGrid = document.getElementById("game-grid");

  var squares = document.getElementsByClassName("square");
  function addEventListener(event, func) {
    for (let i = 0; i < squares.length; i++) {
      squares[i].addEventListener(event, func);
    }
  }
  function removeEventListener(event, func) {
    for (let i = 0; i < squares.length; i++) {
      squares[i].removeEventListener(event, func);
    }
  }
  addEventListener("click", onTouch);

  function checkWin() {
    var winner;
    winningCombinations.some((value) => {
      winner = value.reduce((prev, curr) => {
        curr = board[curr[1]][curr[0]];
        if (prev == "" || curr == "") return "";
        if (curr != prev) return "";
        return curr;
      }, board[value[0][1]][value[0][0]]);
      return winner != "";
    });
    return winner;
  }

  function checkFull() {
    return !board.flat().some((value) => {
      return value == "";
    });
  }

  function setSymbol(coords, symbol) {
    board[coords[1]][coords[0]] = symbol;
    render();
  }

  function setHoverSymbol(symbol) {
    gameGrid.style.setProperty("--hover-symbol", `"${symbol}"`);
  }

  function getSymbol(coords) {
    return board[coords[1]][coords[0]];
  }

  var onTouchCallbacks = [];
  function registerOnTouchCallback(func) {
    onTouchCallbacks.push(func);
  }
  function removeOnTouchCallback(func) {
    var index = onTouchCallbacks.indexOf(func);
    onTouchCallbacks.splice(index, 1);
  }
  function onTouch(event) {
    onTouchCallbacks.forEach((func) => {
      var coords = event.currentTarget.lastElementChild.textContent.split(",");
      func(coords);
    });
  }

  function render() {
    var flatBoard = board.flat(Infinity);
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].firstElementChild.className == "text")
        squares[i].firstElementChild.remove();
      let symbolElement = document.createElement("div");
      symbolElement.classList.add("text");
      symbolElement.textContent = flatBoard[i];
      squares[i].prepend(symbolElement);
    }
  }

  function disableBoard() {
    for (let i = 0; i < squares.length; i++) {
      squares[i].classList.add("disabled");
    }
  }

  function enableBoard() {
    for (let i = 0; i < squares.length; i++) {
      squares[i].classList.remove("disabled");
    }
  }

  function resetBoard() {
    board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    render();
  }

  return {
    board,
    checkWin,
    checkFull,
    setSymbol,
    getSymbol,
    setHoverSymbol,
    disableBoard,
    enableBoard,
    resetBoard,
    render,
    registerOnTouchCallback,
    removeOnTouchCallback,
  };
})();

function Player(name, symbol) {
  this.name = name;
  this.symbol = symbol;
}

var Game = (function () {
  var player1 = new Player("Player 1", "X");
  var player2 = new Player("Player 2", "O");
  var currPlayer = player1;
  var statusText = document.getElementById("status-text");
  var resetButton = document.getElementById("reset");

  resetButton.addEventListener("click", () => {
    Gameboard.resetBoard();
    Gameboard.enableBoard();
    Gameboard.registerOnTouchCallback(actionMade);
    currPlayer = player1;
    statusText.textContent = `${currPlayer.name} Turn`;
    Gameboard.setHoverSymbol(currPlayer.symbol);
  });

  Gameboard.registerOnTouchCallback(actionMade);
  Gameboard.setHoverSymbol(currPlayer.symbol);

  function actionMade(coords) {
    if (Gameboard.getSymbol(coords) != "") return;
    Gameboard.setSymbol(coords, currPlayer.symbol);
    let win = Gameboard.checkWin();
    let stalemate = Gameboard.checkFull();
    if (win || stalemate) {
      Gameboard.disableBoard();
      Gameboard.removeOnTouchCallback(actionMade);
      if (win) statusText.textContent = `${currPlayer.name} wins!`;
      else if (stalemate) statusText.textContent = "Stalemate!";
      return;
    }
    currPlayer = currPlayer == player1 ? player2 : player1;
    Gameboard.setHoverSymbol(currPlayer.symbol);
    statusText.textContent = `${currPlayer.name} Turn`;
  }
})();
