"use strict";

let turn = document.querySelector("#turn-or-result .turn");
let result = document.getElementById("turn-or-result");
let random = Math.round(Math.random());
const boxs = document.querySelectorAll(".grid .box");
const header = document.querySelector("header");
const resetBtn = document.getElementById("reset-btn");

let winner = null;
let winningMessage = "";

resetBtn.onclick = () => {
  boxs.forEach((box) => (box.textContent = ""));
  winner = null;
  winningMessage = "";
  count = 0;
  random = Math.round(Math.random());
  turn.textContent = random ? "X" : "O";
  winningMessage = "";
  result.innerHTML = `
  Turn: <span class="turn"></span>`;
  turn = document.querySelector("#turn-or-result .turn");
  turn.textContent = random ? "O" : "X";
};

turn.textContent = random ? "X" : "O";

boxs.forEach((box, index) =>
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
    if (count >= 3) {
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
    boxs[currRowIndexes[0]].textContent ===
      boxs[currRowIndexes[1]].textContent &&
    boxs[currRowIndexes[1]].textContent === boxs[currRowIndexes[2]].textContent
  ) {
    winner = boxs[currRowIndexes[0]].textContent;
    winningMessage = `${winner} wins !!!`;
    // const result = document.getElementById("turn-or-result");
    result.textContent = winningMessage;

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
    boxs[currColIndexes[0]].textContent ===
      boxs[currColIndexes[1]].textContent &&
    boxs[currColIndexes[1]].textContent === boxs[currColIndexes[2]].textContent
  ) {
    winner = boxs[currColIndexes[0]].textContent;
    winningMessage = `${winner} wins !!!`;
    // const result = document.getElementById("turn-or-result");
    result.textContent = winningMessage;
    return;
  }

  //   console.log("currColIndexes", currColIndexes);
  // the diagonals

  if (
    (boxs[0].textContent === "X" || boxs[0].textContent === "O") &&
    boxs[0].textContent === boxs[4].textContent &&
    boxs[4].textContent === boxs[8].textContent
  ) {
    winner = boxs[0].textContent;
    winningMessage = `${winner} wins !!!`;
    result.textContent = winningMessage;
    return;
  } else if (
    (boxs[2].textContent === "X" || boxs[2].textContent === "O") &&
    boxs[2].textContent === boxs[4].textContent &&
    boxs[4].textContent === boxs[6].textContent
  ) {
    winner = boxs[2].textContent;
    winningMessage = `${winner} wins !!!`;
    result.textContent = winningMessage;
    return;
  }

  // is draw
  if (count === 9 && winner === null) {
    winningMessage = `Draw !!!`;
    result.textContent = winningMessage;
    return;
  }
}
