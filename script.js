//**** GLOBALS ***//
// keep data about the game in a 2-D array
const board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

let boardSize;

const numberOfPlayers = 2;

// the element that contains the rows and squares
let boardElement;

// the element that contains the entire board
// we can empty it out for convenience
let boardContainer;

// current player global
let currentPlayer;

// the element that outputs game info
let output;

// the element that tracks player scores
let scoreBoard; 

// player scores
let score1;
let score2;

// number of rounds
let numberOfRounds = 0;

// playerInfo array to store data on a certain number of players
let playerInfo = [];


//*** GAME LOGIC ***//
// get player info
const getPlayerInfo = () => {
  // Get the name of players 1 and 2
}

// completely rebuilds the entire board every time there's a click
const buildBoard = (board) => {
  // start with an empty container
  boardContainer.innerHTML = '';
  boardElement = document.createElement('div');
  boardElement.classList.add('board');

  // move through the board data array and create the
  // current state of the board
  for (let i = 0; i < board.length; i += 1) {
    // separate var for one row / row element
    const row = board[i];
    const rowElement = document.createElement('div');
    rowElement.classList.add('row');

    // set each square
    // j is the column number
    for (let j = 0; j < row.length; j += 1) {
      // one square element
      const square = document.createElement('div');
      square.classList.add('square');

      // set the text of the square according to the array
      square.innerText = board[i][j];

      rowElement.appendChild(square);

      // set the click all over again
      // eslint-disable-next-line
      square.addEventListener('click', () => {
        squareClick(i, j);
      });
    }

    // add a single row to the board
    boardContainer.appendChild(rowElement);
  }
};

// switch the global values from one player to the next
const togglePlayer = () => {
  if (currentPlayer === 'X') {
    currentPlayer = 'O';
  } else {
    currentPlayer = 'X';
  }
};

// build the element that shows output
const displayOutput = (message) => {
  output.innerText = message;
};

// build the element that shows the scoreboard
const displayScoreboard = (score1, score2) => {
  scoreBoard.innerText = `Scores for round ${numberOfRounds}
  ${playerInfo[0].playerName}: ${score1}
  ${playerInfo[1].playerName}: ${score2}`;
};

const squareClick = function (column, row) {
  console.log('coordinates', row, column);
  // if the clicked square has not been clicked before,
  if (board[column][row] === '') {
    // assign value of this data to be the currentPlayer's mark
    board[column][row] = currentPlayer;

    // refresh the screen with a new board
    // according to the array that was just changed
    buildBoard(board);

    if (checkWin(board) === true) {
      console.log('win!');
      // variable to store winner's name
      let winnerName;
      // game over
      // increment number of wins for this player
      for (i = 0; i < playerInfo.length; i++) {
        const thisPlayerMark = playerInfo[i].mark;
        if (thisPlayerMark === currentPlayer) {
          // get the name of this player
          winnerName = playerInfo[i].playerName;
          // increment his/her score
          playerInfo[i].score += 1;
        }
      }

      // display output of winner and game over
      displayOutput(`${winnerName} wins! GAME OVER.`);
      // display scoreboard;
      const score1 = playerInfo[0].score;
      const score2 = playerInfo[1].score;
      displayScoreboard(score1, score2);
    } else {
      console.log('no win yet');
      // switch to the next player
      togglePlayer();
    }
  }
};

// check whether the game is won - returns true if won, and false if otherwise
const checkWin = (board) => {

  // Nested loop to check for wins: 1. horizontally and 2. vertically
  for (i = 0; i < boardSize; i++) {
    // 1. To check horizontally, fix the row (i) and loop through the columns (j)
    console.log("checking for horizontal wins..");
    let firstRowEntry = board[i][0]
    
    console.log(`Looping through row ${i}..`)
    console.log(`first row entry: ${firstRowEntry}`);
    for (j = 1; j < board.length; j++) {
      // this row
      let row = board[i];
      console.log(`Coordinates (${i}, ${j}): ${row[j]}`);
      // if any entry in from the second entry onward is not equal to the first entry, then this player has not won yet-> return false. Otherwise, return true.
      if (row[j] !== firstRowEntry) {
        console.log('no match');
        return false;
      } else {
        console.log('match!')
        return true;
      }
    }
    // 2. To check vertically, fix the column (i) and loop through the rows (j)
    console.log("checking for vertical wins..");
    let firstColumnEntry = board[0][i];

    console.log(`Looping through column ${i}..`)
    console.log(`first column entry: ${firstColumnEntry}`);
    for (j = 1; j < board.length; j++) {
      // if any entry from the second entry onward is not equal to the first entry, then this player has not won yet-> return false. Otherwise, return true.
      console.log(`Coordinates (${j}, ${i}): ${board[j][i]}`);
      (board[j][i] !== firstColumnEntry) ? false : true;
    }
    
  }

  // loop to check diagonal left to right
  for (i = 0; i < boardSize; i++) {
    let topLeftEntry = board[0][0];
    // if the three diagonal left to right entries are not equal, then return false
    (board[i][i] !== topLeftEntry) ? false : true;
  }
  // loop to check diagonal right to left
  let topRightEntry = board[boardSize - 1][boardSize - 1];
  for (j = boardSize - 1; j > 0; j -= 1) {
    // let i be the row number in terms of j: i = j - (2j - (boardSize - 1)
    let i = boardSize - 1 - j;
    // if the three diagonal right to left entries are not equal, then return false
    (board[j][i] !== topRightEntry) ? false : true;
  }
};

// function to store user input of the players' names and marks (X or O) into the global array playerInfo
const createPlayerInfo = (input, mark1, mark2) => {
  // 'input' will be the string of names that the user inputs later
  const names = input.split(",");
  // array to store marks for player 1 and 2 in this order
  const marks = [mark1, mark2];
  for (i = 0; i < numberOfPlayers; i++) {
    // create an object with attributes playerName, mark, and score per player
    const thisPlayerName = names[i];
    const thisPlayerMark = marks[i];
    const thisPlayerInfo = {
      playerName: thisPlayerName,
      mark: thisPlayerMark,
      score: 0,
    }
    // push this object into global playerInfo array
    playerInfo.push(thisPlayerInfo);
  }
  console.log(marks);
}


// create the board container element and put it on the screen
const initGame = () => {
  // store playerinfo in global array
  const input = "bob,alice";
  createPlayerInfo(input, "X", "O");

  // store boardSize in global variable
  boardSize = 3;

  // increment numberOfRounds
  numberOfRounds += 1;

  // Initialise current player
  currentPlayer = playerInfo[0].mark;
  console.log(`currentPlayer: ${currentPlayer}`);

  // create board container
  boardContainer = document.createElement('div');
  document.body.appendChild(boardContainer);

  // build the board - right now it's empty
  buildBoard(board);

  // build output element
  output = document.createElement('div');
  output.classList.add('output');
  document.body.appendChild(output);

  // build scoreboard element
  scoreBoard = document.createElement('div');
  scoreBoard.classList.add('score-board');
  document.body.appendChild(scoreBoard);
};

initGame();

