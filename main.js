"use strict";

let turn = document.querySelector("#turn-or-result .turn");
let result = document.getElementById("turn-or-result");
let random = Math.round(Math.random());
const boxes = document.querySelectorAll(".grid .box");
const header = document.querySelector("header");
const resetBtn = document.getElementById("reset-btn");

let winner = null;
let winningMessage = "";

resetBtn.onclick = () => {
  boxes.forEach((box) => (box.textContent = ""));
  winner = null;
  count = 0;
  random = Math.round(Math.random());
  winningMessage = "";
  result.innerHTML = `Turn: <span class="turn"></span>`;
  turn = document.querySelector("#turn-or-result .turn");
  turn.textContent = random ? "X" : "O";
};

function displayWinner() {
  winningMessage = `${winner} wins !!!`;
  result.textContent = winningMessage;
}

turn.textContent = random ? "X" : "O";

boxes.forEach((box, index) =>
  box.addEventListener("click", function () {
    if (winningMessage) return;
    draw.call(box, index);
  }),
);

let count = 0;

function draw(index) {
  let currentTurn = turn.textContent;

  if (!this.textContent) {
    if (currentTurn == "X") {
      this.textContent = "X";
      turn.textContent = "O";
    } else {
      this.textContent = "O";
      turn.textContent = "X";
    }
    count++;
    if (count >= 5) {
      whoIsTheWinner(index);
    }
  }
}

function whoIsTheWinner(index) {
  // the row of this

  const rows = [];
  rows[0] = [0, 1, 2];
  rows[1] = [3, 4, 5];
  rows[2] = [6, 7, 8];

  let currRow;
  currRow = rows.findIndex((row) => row.includes(index));
  //   console.log("current row", currRow);
  const currRowIndexes = rows[currRow];
  //   console.log("currRowIndexes", currRowIndexes);
  if (
    boxes[currRowIndexes[0]].textContent ===
      boxes[currRowIndexes[1]].textContent &&
    boxes[currRowIndexes[1]].textContent ===
      boxes[currRowIndexes[2]].textContent
  ) {
    winner = boxes[currRowIndexes[0]].textContent;
    displayWinner();

    return;
  }
  // the columnn of this

  const columns = [];
  columns[0] = [0, 3, 6];
  columns[1] = [1, 4, 7];
  columns[2] = [2, 5, 8];
  let currCol;
  currCol = columns.findIndex((column) => column.includes(index));

  const currColIndexes = columns[currCol];
  //   console.log("currCol", currCol);
  if (
    boxes[currColIndexes[0]].textContent ===
      boxes[currColIndexes[1]].textContent &&
    boxes[currColIndexes[1]].textContent ===
      boxes[currColIndexes[2]].textContent
  ) {
    winner = boxes[currColIndexes[0]].textContent;
    displayWinner();
    return;
  }

  //   console.log("currColIndexes", currColIndexes);
  // the diagonals

  if (
    (boxes[0].textContent === "X" || boxes[0].textContent === "O") &&
    boxes[0].textContent === boxes[4].textContent &&
    boxes[4].textContent === boxes[8].textContent
  ) {
    winner = boxes[0].textContent;
    displayWinner();
    return;
  } else if (
    (boxes[2].textContent === "X" || boxes[2].textContent === "O") &&
    boxes[2].textContent === boxes[4].textContent &&
    boxes[4].textContent === boxes[6].textContent
  ) {
    winner = boxes[2].textContent;
    displayWinner();
    return;
  }

  // is draw
  if (count === 9 && winner === null) {
    winningMessage = `Draw !!!`;
    result.textContent = winningMessage;
    return;
  }
}
