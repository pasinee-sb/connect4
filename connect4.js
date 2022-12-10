
/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

let WIDTH = 7;
let HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
 //make empty arrays inside board array and fill each array with null

 //for every column(y) push null value for each width block
 //expect 6 rows of arrays of [null,null,null,null,null,null,null]
 for(let y=0; y<HEIGHT; y++){
  board.push([]);
  for(let x=0;x<WIDTH; x++){
    board[y].push(null);
  }
 }
//  console.log(board);
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
const htmlBoard =  document.getElementById('board')
  // TODO: add comment for this code
  //create row for top columns
 let top = document.createElement("tr");
  //add id to top column "column-top"
  top.setAttribute("id", "column-top");
  //  listens to clicks on those columns to add a player's piece
  top.addEventListener("click", handleClick);


//Iterate horizontally to create cells on the top
  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    //append headcells to the rows creted on "top"
    top.append(headCell);
  }
  //append these top rows with heaadcells to the htmlBoard
  htmlBoard.append(top);

  // TODO: add comment for this code
  //create rows and cells in the row
  for (let y = 0; y < HEIGHT; y++) {
    //create row
    const row = document.createElement("tr");
    //create cell to add to each row
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      //give each cell its id of y-x
      cell.setAttribute("id", `${y}-${x}`);
      //append cells to rows
      row.append(cell);
      
      
    }
    //append rows to the main htmlBoard
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
 for (let y=HEIGHT-1;y>=0;y--){
  if(!board[y][x]){
    // console.log (y);
    // console.log(board[y][x]);
    return y;
  }
 }
 return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell

  const corresCell = document.getElementById(`${y}-${x}`);
  const divOfCell = document.createElement("div");
  divOfCell.classList.add("piece");
  if (currPlayer === 1){
    divOfCell.classList.add("p1");
   
  }else if(currPlayer===2) {
    divOfCell.classList.add("p2");
   
  }
  
  

  corresCell.append(divOfCell);
  board[y][x]=currPlayer;

  

  
  // corresCell.innerHTML="taken";
  // board[y]==="taken";
  // console.log(board[y][x]);



}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
 setTimeout(()=>{
  alert(msg)
 },200);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  // console.log(evt);
  
  var x = +evt.target.id;
  
  

  // get next spot in column (if none, ignore click)
  var y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);
  console.log("currplayer", currPlayer);

  

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
 //because board is an array of 7 rows, in each rows is an array of cells
 //use .every() to check for tie

const cellArr = board.flat();
console.log(cellArr);
const filledCell = (currVal)=> currVal!==null;
if(cellArr.every(filledCell)){
 endGame("It's a tie!");
}


 

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  if(currPlayer===1){
    currPlayer =2
  }else {currPlayer =1}

 
 
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer
    
//I am not sure why there is a need to check if:
// y >= 0 &&
// y < HEIGHT &&
 // x >= 0 &&
 // x < WIDTH &&
 //I tried to comment out these each one at a time, they worked fine except for when I commented out 
// y<HEIGHT line, turned out currPlayer stopped switching
    return cells.every(
      ([y, x]) =>
        // y >= 0 &&
        y < HEIGHT &&
        // x >= 0 &&
        // x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  //looping through each cell 
  //for each y-axis
  for (let y = 0; y < HEIGHT; y++) {
    //combined with each x-axis
    for (let x = 0; x < WIDTH; x++) {
      //save the x,y coordinates in variables for winning positions. horizontally, vertically
      // , diagonally Right, and diagonally Left 
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
//check if any one of the coordinates fits the winning positions, if so, return true for checkForWin()
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
