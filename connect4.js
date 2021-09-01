/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for(let i =0; i < HEIGHT; i++){
    let arr = [];
    for(let j = 0; j < WIDTH; j++){
      arr[j] = null;
    }
    board[i] = arr;
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  const htmlBoard = document.getElementById("board");

  // creates the top of the connect 4 row and adds an event listener
  //only this section will have click event to play the game
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  //creates a td element for the top column and adds id 0-WIDTH 
  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // creates HEIGHT rows, adds id 'y-x' to tell the y position and x position
  //adds the rows to the html board
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }

/* The htmlBoard table elements will have the ID property as follows:
top:          0             1               2               3             ...   (WIDTH-1)
row0:         0-0           0-1             0-2             0-3           ...   0-(WIDTH-1)
row1:         1-0           1-1             1-2             1-3           ...   1-(WIDTH-1)
.             .             .               .               .             ...   .
.             .             .               .               .             ...   .
.             .             .               .               .             ...   .
row(HEIGHT): (HEIGHT-1)-0   (HEIGHT -1)-1   (HEIGHT-1)-2   (HEIGHT-1)-3   ...   (HEIGHT-1)-(WIDTH-1) */
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for(let y = HEIGHT-1; y >= 0; y--){
    if(board[y][x] == null){
      //return document.getElementById(`${y}-${x}`)
      return y;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const div = document.createElement('div');
  const cell = document.getElementById(`${y}-${x}`);
  if(currPlayer == 1){
    div.classList.add('p1');
  }else{
    div.classList.add('p2');
  }
  div.classList.add('piece');
  //prevents adding multiple divs in same cell
  if(!cell.firstElementChild) cell.append(div);
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);
  board[y][x] = currPlayer;
  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if(checkForTie()){
    return endGame('Tie Game');
  }

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  if(currPlayer == 1){
    currPlayer = 2;
  }else{
    currPlayer = 1;
  }
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

function checkForTie(){
  for(let i = 0; i < HEIGHT; i++){
    for(let j = 0; j < WIDTH; j++){
      if(board[i][j] == null){
        return false;
      }
    }
  }
  return true;
}
makeBoard();
makeHtmlBoard();
