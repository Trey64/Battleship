'use strict';

var ships = [2, 3, 3, 4, 5]; // array of ship sizes each board will contain
var alphaValues = ['a', 0, 'b', 10, 'c', 20, 'd', 30, 'e', 40, 'f', 50, 'g', 60, 'h', 70, 'i', 80, 'j', 90];
var userInput = document.getElementById('user_input');

// Constructor for a single board of Battleships
function Battleship(ships) {
  this.openSquares = [];
  this.shipSquares = [];
  this.hits = [];
  this.misses = [];
  this.horizontalShips = [];
  this.verticalShips = [];
  this.ships = ships;
}

// method to generate an empty game board with numbers from 0 to 99
//   each number represents a square on a classic 10 x 10 board
Battleship.prototype.populateOpenSquares = function() {
  for (var i = 0; i <= 99; i++) {
    this.openSquares.push(i);
  }
};

// method for each battleship object to randomly determine which ships are vertical
//   and which ships are horizontal
Battleship.prototype.determineShipOrientation = function() {
  for (var i = 0; i < this.ships.length; i++) {
    if (randomNumber(0, 1) === 0) {
      this.horizontalShips.push(this.ships[i]);
    } else {
      this.verticalShips.push(this.ships[i]);
    }
  }
};

// method to randomly generate positions of the horizontal ships
Battleship.prototype.generateHorizontalShipLocations = function() {
  for (var i = 0; i < this.horizontalShips.length; i++) {

    // since it is from the openSpaces array, the starting square will always be valid
    var startingSquare = this.openSquares[randomNumber(0, this.openSquares.length)];
    var endingSquare = startingSquare + (this.horizontalShips[i] - 1);

    // checks which row the startingSquare and endingSquare are on
    var startingSquareRow = Math.floor(startingSquare / 10);
    var endingSquareRow = Math.floor(endingSquare / 10);

    // gets the index of the starting and ending squares in the open spaces array
    var indexOfStartingSquare = this.openSquares.indexOf(startingSquare);
    var indexOfEndingSquare = this.openSquares.indexOf(endingSquare);

    // Fixes the position of the ship
    while (endingSquareRow - startingSquareRow !== 0 || this.shipSquares.includes(startingSquareRow) || this.shipSquares.includes(endingSquareRow) || indexOfEndingSquare - indexOfStartingSquare !== (this.horizontalShips[i] - 1) || typeof startingSquare !== 'number') {
      startingSquare = this.openSquares[randomNumber(0, this.openSquares.length)];
      endingSquare = startingSquare + (this.horizontalShips[i] - 1);
      startingSquareRow = Math.floor(startingSquare / 10);
      endingSquareRow = Math.floor(endingSquare / 10);
      indexOfStartingSquare = this.openSquares.indexOf(startingSquare);
      indexOfEndingSquare = this.openSquares.indexOf(endingSquare);
    }

    // Adds the ship's coordinates to the shipSpaces array and removes them from the open spaces array
    for (var j = 0; j < this.horizontalShips[i]; j++) {
      var tempShipCoordinate = startingSquare + j;
      this.shipSquares.push(tempShipCoordinate);
      this.openSquares.splice(this.openSquares.indexOf(tempShipCoordinate), 1);
    }
  }
};

// method to randomly generate positions of the vertical ships
Battleship.prototype.generateVerticalShipLocations = function() {
  for (var i = 0; i < this.verticalShips.length; i++) {

    // since it is from the openSpaces array, the starting square will always be valid
    var startingVerticalSquare = this.openSquares[randomNumber(0, this.openSquares.length)];

    while(startingVerticalSquare >= 80) {
      startingVerticalSquare = this.openSquares[randomNumber(0, this.openSquares.length)];
    }

    var endingVerticalSquare = startingVerticalSquare + ((this.verticalShips[i] - 1) * 10);

    var thisShipCoordinates = [];

    for (var j = 0; j < this.verticalShips[i]; j++) {
      thisShipCoordinates[j] = startingVerticalSquare + (10 * j);
    }

    // helper function to check if any of this vertical ship coordinates are already taken
    //   credit to a user from stack overflow
    var checkIfContains = function(haystack, arr) {
      return arr.some(function (v) {
        return haystack.indexOf(v) >= 0;
      });
    };

    while (endingVerticalSquare >= 99 || checkIfContains(this.shipSquares, thisShipCoordinates) || typeof startingVerticalSquare !== 'number') {
      startingVerticalSquare = this.openSquares[randomNumber(0, this.openSquares.length)];
      endingVerticalSquare = startingVerticalSquare + ((this.verticalShips[i] - 1) * 10);
      for (var k = 0; k < this.verticalShips[i]; k++) {
        thisShipCoordinates[k] = startingVerticalSquare + (10 * k);
      }
    }

    // Adds the ship's coordinates to the shipSpaces array and removes them from the open spaces array
    for (var p = 0; p < this.verticalShips[i]; p++) {
      var tempShipCoordinate = startingVerticalSquare + (p * 10);
      this.shipSquares.push(tempShipCoordinate);
      this.openSquares.splice(this.openSquares.indexOf(tempShipCoordinate), 1);
    }
  }
};

// method to show the ship positions on the game board
Battleship.prototype.renderShipPositions = function() {
  for (var i = 0; i < this.shipSquares.length; i++) {

    // get the td element id
    var tdIdentifier = 'b' + this.shipSquares[i];

    // give the corresponding squares color
    var tdEl = document.getElementById(tdIdentifier);
    tdEl.style.backgroundColor = 'gray';
  }
};

////////////////////////////////////////////////////////////////////////////////
//////////      Function Declarations      /////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// returns an integer between the passed min and max parameters (both ends inclusve)
function randomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// event handler
function handleUserSubmit(event) {

  event.preventDefault(); // I dunno what this does

  // var alphaValues = ['a', 0, 'b', 10, 'c', 20, 'd', 30, 'e', 40, 'f', 50, 'g', 60, 'h', 70, 'i', 80, 'j', 90];

  var guessedCoordinateRaw = event.target.coordinates.value;
  var guessedCoordinateAlpha = guessedCoordinateRaw[0].toLowerCase();
  var guessedCoordinateNum = parseInt(guessedCoordinateRaw[1]);
  var guessedCoordinateAdjusted = parseInt(alphaValues[(alphaValues.indexOf(guessedCoordinateAlpha)) + 1]) + guessedCoordinateNum;

  event.target.coordinates.value = null; // clears the input field

  if (topBoard.misses.includes(guessedCoordinateAdjusted) || topBoard.hits.includes(guessedCoordinateAdjusted)) {
    alert('You\'ve already fired there! Choose a different location.');
    return;
  }

  var coordinateString = guessedCoordinateAdjusted.toString();
  var tdEl = document.getElementById(coordinateString);

  if (topBoard.shipSquares.includes(guessedCoordinateAdjusted)) {
    tdEl.style.backgroundColor = '#C90000';
    tdEl.className = 'magictime vanishIn';
    tdEl.style.backgroundImage = "url('images/battleshipIcon.png')";
    topBoard.hits.push(guessedCoordinateAdjusted);
    alert('Hit!');
  } else {
    tdEl.style.backgroundColor = 'white';
    tdEl.className = 'magictime vanishIn';
    topBoard.misses.push(guessedCoordinateAdjusted);
    alert('Miss!');
  }

  computerGuessEasy();
}

// logic for how the computer guesses on its turn
function computerGuessEasy() {

  var randomGuess = randomNumber(0, 99);

  while (bottomBoard.misses.includes(randomGuess) || bottomBoard.hits.includes(randomGuess)) {
    randomGuess = randomNumber(0, 99);
  }

  var randomGuessTenthValue = (Math.floor(randomGuess / 10)) * 10;
  // getting the letter for displaying to the user what square the computer guessed
  var randomGuessRowLetter = alphaValues[(alphaValues.indexOf(randomGuessTenthValue)) - 1];

  var randomGuessString;

  if (randomGuess < 10) {   // row value is A
    randomGuessString = randomGuessRowLetter + randomGuess.toString();
  } else {
    randomGuessString = randomGuessRowLetter + (randomGuess % 10).toString();
  }

  var bottomSquareIndex = 'b' + randomGuess.toString();

  alert('The enemy is attacking! ' + randomGuessString.toUpperCase() + '!');

  var tdEl = document.getElementById(bottomSquareIndex);

  if (bottomBoard.shipSquares.includes(randomGuess)) {
    tdEl.style.backgroundColor = '#C90000';
    tdEl.className = 'magictime vanishIn';
    tdEl.style.backgroundImage = "url('images/battleshipIcon.png')";
    bottomBoard.hits.push(randomGuess);
  } else {
    tdEl.style.backgroundColor = 'white';
    tdEl.className = 'magictime vanishIn';
    bottomBoard.misses.push(randomGuess);
  }


}

////////////////////////////////////////////////////////////////////////////////
////   Function Calls & Object Instantiation   /////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

var topBoard = new Battleship(ships);
var bottomBoard = new Battleship(ships);

topBoard.populateOpenSquares();
topBoard.determineShipOrientation();
topBoard.generateHorizontalShipLocations();
topBoard.generateVerticalShipLocations();

bottomBoard.populateOpenSquares();
bottomBoard.determineShipOrientation();
bottomBoard.generateHorizontalShipLocations();
bottomBoard.generateVerticalShipLocations();
bottomBoard.renderShipPositions();    // we only render bottom, i.e. the user's ships

userInput.addEventListener('submit', handleUserSubmit);
