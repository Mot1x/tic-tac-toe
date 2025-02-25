const CROSS = "X";
const ZERO = "O";
const EMPTY = " ";

const winLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
var field = [
  [" ", " ", " "],
  [" ", " ", " "],
  [" ", " ", " "],
];

var stepCount = 0;
var isGameEnded = false;
const container = document.getElementById("fieldWrapper");

startGame();
addResetListener();

function startGame() {
  renderGrid(3);
}

function renderGrid(dimension) {
  container.innerHTML = "";

  for (let i = 0; i < dimension; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < dimension; j++) {
      const cell = document.createElement("td");
      cell.textContent = EMPTY;
      cell.addEventListener("click", () => cellClickHandler(i, j));
      row.appendChild(cell);
    }
    container.appendChild(row);
  }
}

function cellClickHandler(row, col) {
  if (field[row][col] !== EMPTY || isGameEnded) return;

  field[row][col] = stepCount % 2 === 0 ? CROSS : ZERO;
  stepCount++;
  renderSymbolInCell(field[row][col], row, col);

  handleWinner();

  if (!isGameEnded && stepCount === 9) {
    alert("Победила дружба");
    isGameEnded = true;
  }
}

function renderSymbolInCell(row, col, color = "red") {
  findCell(row, col).style.color = color;
}

function handleWinner() {
  for (const line of winLines) {
    const cells = line.map(index => {
      const row = Math.floor(index / 3);
      const col = index % 3;
      return [row, col];
    });

    const [cell0, cell1, cell2] = cells.map(([r, c]) => field[r][c]);
    if (cell0 !== EMPTY && cell0 === cell1 && cell1 === cell2) {
      alert(cell0);
      cells.forEach(([r, c]) => paintCell(r, c));
      isGameEnded = true;
      return;
    }
  }
}

function paintCell(row, col, color = "red") {
  findCell(row, col).style.color = color;
}

function findCell(row, col) {
  const targetRow = container.querySelectorAll("tr")[row];
  return targetRow.querySelectorAll("td")[col];
}

function addResetListener() {
  const resetButton = document.getElementById("reset");
  resetButton.addEventListener("click", resetClickHandler);
}

function resetClickHandler() {
  field = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
  ];
  stepCount = 0;
  isGameEnded = false;
  renderGrid(3);
}

/* Test Functions */
function testWin() {
  clickOnCell(0, 2);
  clickOnCell(0, 0);
  clickOnCell(2, 0);
  clickOnCell(1, 1);
  clickOnCell(2, 2);
  clickOnCell(1, 2);
  clickOnCell(2, 1);
}

function testDraw() {
  clickOnCell(2, 0);
  clickOnCell(1, 0);
  clickOnCell(1, 1);
  clickOnCell(0, 0);
  clickOnCell(1, 2);
  clickOnCell(0, 2);
  clickOnCell(0, 1);
  clickOnCell(2, 1);
  clickOnCell(2, 2);
}

function clickOnCell(row, col) {
  findCell(row, col).click();
}