const CROSS = "X";
const ZERO = "O";
const EMPTY = " ";

const winLines = [
  (0, 1, 2),
  (3, 4, 5),
  (6, 7, 8),
  (0, 3, 6),
  (1, 4, 7),
  (2, 5, 8),
  (0, 4, 8),
  (2, 4, 6),
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
  console.log(`Clicked on cell: ${row}, ${col}`);
  renderSymbolInCell(field[row][col], row, col);

  handleWinner();

  if (stepCount === 9) alert("Победила дружба");
}

function renderSymbolInCell(symbol, row, col, color = "#333") {
  const targetCell = findCell(row, col);

  targetCell.textContent = symbol;
  targetCell.style.color = color;
}

function handleWinner() {
  for (const line of winLines) {
    cells = [
      (Math.floor(line[0] / 3), line[0] % 3),
      (Math.floor(line[1] / 3), line[1] % 3),
      (Math.floor(line[2] / 3), line[2] % 3),
    ];

    if (
      field[cells[0][0]][line[0][1] % 3] != EMPTY &&
      (field[cells[0][0]][line[0][1] % 3] ===
        field[cells[1][0]][line[1][1] % 3]) ===
        field[cells[2][0]][line[2][1] % 3]
    ) {
      alert(field[cells[0][0]][line[0][1] % 3]);
      paintCell(field[cells[0][0]][line[0][1] % 3]);
      paintCell(field[cells[1][0]][line[1][1] % 3]);
      paintCell(field[cells[2][0]][line[2][1] % 3]);
      isGameEnded = true;
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
  console.log("reset!");
}

/* Test Function */
/* Победа первого игрока */
function testWin() {
  clickOnCell(0, 2);
  clickOnCell(0, 0);
  clickOnCell(2, 0);
  clickOnCell(1, 1);
  clickOnCell(2, 2);
  clickOnCell(1, 2);
  clickOnCell(2, 1);
}

/* Ничья */
function testDraw() {
  clickOnCell(2, 0);
  clickOnCell(1, 0);
  clickOnCell(1, 1);
  clickOnCell(0, 0);
  clickOnCell(1, 2);
  clickOnCell(1, 2);
  clickOnCell(0, 2);
  clickOnCell(0, 1);
  clickOnCell(2, 1);
  clickOnCell(2, 2);
}

function clickOnCell(row, col) {
  findCell(row, col).click();
}
