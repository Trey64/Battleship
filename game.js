'use strict';

var randomMode = true;  // for how the computer guesses with medium and hard difficulties
var ships = [2, 3, 3, 4, 5]; // array of ship sizes each board will contain
var alphaValues = ['a', 0, 'b', 10, 'c', 20, 'd', 30, 'e', 40, 'f', 50, 'g', 60, 'h', 70, 'i', 80, 'j', 90];
var lockedOnStack = [];
var userInput = document.getElementById('user_input');

// Constructor for a single board of Battleships
function Battleship(ships) {
  this.openSquares;
  this.shipSquares = [];
  this.hits = [];
  this.misses = [];
  this.horizontalShips = [];
  this.verticalShips = [];
  this.shipSquaresKey = [];    // will contain the order of how ships are arranged in shipSquares
  this.groupedShipSquares = [];    // will contain an array of arrays, each representing a ship
  this.ships = ships;
}

// method to generate an empty game board with numbers from 0 to 99
//   each number represents a square on a classic 10 x 10 board
Battleship.prototype.populateOpenSquares = function() {
  this.openSquares = [];   // emptys the array for when we want to "repopulate" a semi-full array
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

// method to populate the shipSquaresKey array -- showing the order of the ships in shipSquaresKey
Battleship.prototype.getShipSquaresKey = function() {
  this.shipSquaresKey = this.horizontalShips.concat(this.verticalShips);
};

// method to populate the groupedShipSquares array
Battleship.prototype.groupShipSquares = function() {
  var tempShip = [];
  var shipSquaresIndex = 0;
  for (var i = 0; i < this.shipSquaresKey.length; i++) {
    for (var j = 0; j < this.shipSquaresKey[i]; j++) {
      tempShip.push(this.shipSquares[shipSquaresIndex]);
      shipSquaresIndex++;
    }
    this.groupedShipSquares.push(tempShip);
    tempShip = [];
  }
};

// method to randomly generate positions of the horizontal ships
Battleship.prototype.generateHorizontalShipLocations = function() {
  for (var i = 0; i < this.horizontalShips.length; i++) {

    // since it is from the openSpaces array, the starting square will always be valid
    var startingSquare = this.openSquares[randomNumber(0, this.openSquares.length - 1)];
    var endingSquare = startingSquare + (this.horizontalShips[i] - 1);

    // checks which row the startingSquare and endingSquare are on
    var startingSquareRow = Math.floor(startingSquare / 10);
    var endingSquareRow = Math.floor(endingSquare / 10);

    // gets the index of the starting and ending squares in the open spaces array
    var indexOfStartingSquare = this.openSquares.indexOf(startingSquare);
    var indexOfEndingSquare = this.openSquares.indexOf(endingSquare);

    // Fixes the position of the ship
    while (endingSquareRow - startingSquareRow !== 0 || this.shipSquares.includes(startingSquareRow) || this.shipSquares.includes(endingSquareRow) || indexOfEndingSquare - indexOfStartingSquare !== (this.horizontalShips[i] - 1) || typeof startingSquare !== 'number') {
      startingSquare = this.openSquares[randomNumber(0, this.openSquares.length - 1)];
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
    var startingVerticalSquare = this.openSquares[randomNumber(0, this.openSquares.length - 1)];

    while(startingVerticalSquare >= 80) {
      startingVerticalSquare = this.openSquares[randomNumber(0, this.openSquares.length - 1)];
    }

    var endingVerticalSquare = startingVerticalSquare + ((this.verticalShips[i] - 1) * 10);

    var thisShipCoordinates = [];

    for (var j = 0; j < this.verticalShips[i]; j++) {
      thisShipCoordinates[j] = startingVerticalSquare + (10 * j);
    }

    while (endingVerticalSquare >= 99 || checkIfContains(this.shipSquares, thisShipCoordinates) || typeof startingVerticalSquare !== 'number') {
      startingVerticalSquare = this.openSquares[randomNumber(0, this.openSquares.length - 1)];
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

// helper function to check if any of this vertical ship coordinates are already taken
//   credit to a user from stack overflow
var checkIfContains = function(haystack, needle) {
  return needle.some(function (v) {
    return haystack.indexOf(v) >= 0;
  });
};

// check if shipSquares array contains at least one element of the ship, i.e. ship is still floating
//   returns true if ship is floating, else returns false
function checkIfStillFloating(haystack, needle) {
  var stillFloating = false;
  for (var i = 0; i < needle.length; i++) {
    if (haystack.includes(needle[i])) {
      stillFloating = true;
    }
  }
  return stillFloating;
}

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
    tdEl.style.backgroundImage = 'url(\'images/battleshipIcon.png\')';
    topBoard.hits.push(guessedCoordinateAdjusted);

    if (topBoard.hits.length === 17) {
      alert('You sunk the CPU\'s fleet! You win!');
      userInput.removeEventListener('submit', handleUserSubmit);
      return;
    } else {
      alert('Hit!');
    }

  } else {
    tdEl.style.backgroundColor = 'white';
    tdEl.className = 'magictime vanishIn';
    topBoard.misses.push(guessedCoordinateAdjusted);
    alert('Miss!');
  }

  computerGuessEasy();
}

// logic for how the computer guesses on its turn for easy mode
function computerGuessEasy() {

  var randomGuess = bottomBoard.openSquares[randomNumber(0, bottomBoard.openSquares.length)];

  // if we remove the randomGuess from the openSquares array, potentially don't need the
  //   following while loop -- test later
  while (bottomBoard.misses.includes(randomGuess) || bottomBoard.hits.includes(randomGuess) || typeof randomGuess !== 'number') {
    randomGuess = bottomBoard.openSquares[randomNumber(0, bottomBoard.openSquares.length - 1)];
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
    tdEl.style.backgroundImage = 'url(\'images/battleshipIcon.png\')';
    bottomBoard.hits.push(randomGuess);

    if (bottomBoard.hits.length === 17) {
      alert('CPU has sunk your fleet! You lose!');
      userInput.removeEventListener('submit', handleUserSubmit);
    }

  } else {
    tdEl.style.backgroundColor = 'white';
    tdEl.className = 'magictime vanishIn';
    bottomBoard.misses.push(randomGuess);
  }

}

// logic for how the computer guesses on its turn for medium mode
function computerGuessMedium() {

  // guesses randomly
  if (randomMode) {

    var randomGuess = bottomBoard.openSquares[randomNumber(0, bottomBoard.openSquares.length - 1)];

    // if we remove the randomGuess from the openSquares array, potentially don't need the
    //   following while loop -- test later
    while (bottomBoard.misses.includes(randomGuess) || bottomBoard.hits.includes(randomGuess) || typeof randomGuess !== 'number') {
      randomGuess = bottomBoard.openSquares[randomNumber(0, bottomBoard.openSquares.length - 1)];
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

    alert('Now the computer\'s turn! ' + randomGuessString + '!');

    var tdEl = document.getElementById(bottomSquareIndex);

    if (bottomBoard.shipSquares.includes(randomGuess)) {   // a hit
      tdEl.style.backgroundColor = 'red';
      bottomBoard.hits.push(randomGuess);
      bottomBoard.shipSquares.splice(bottomBoard.shipSquares.indexOf(randomGuess), 1);

      // checks if the last ship has been sunk
      //    [!!!] Could also check if bottomBoard.shipSquare is empty
      if (bottomBoard.hits.length === 17) {
        alert('CPU has sunk your fleet! You lose!');
        userInput.removeEventListener('submit', handleUserSubmit);
        return;
      }

      // check if the random hit resulted in a ship sinking
      //   if yes, then need to upddate remaining ships array

      var shipSunkByThisShot = false;

      for (var i = 0; i < bottomBoard.shipSquaresKey.length; i++) {
        if (!checkIfStillFloating(bottomBoard.shipSquares, bottomBoard.groupedShipSquares[i])) {
          bottomBoard.shipSquaresKey.splice(i, 1);
          shipSunkByThisShot = true;
        }
      }

      if (!shipSunkByThisShot) {
        randomMode = false;
      }

    } else {   // bottomBoard.shipSquares does NOT include randomGuess, i.e. miss
      tdEl.style.backgroundColor = 'white';
      bottomBoard.misses.push(randomGuess);
    }

  } else {  // random mode is off, i.e trying to sink the ship it has found

  }

}

////////////////////////////////////////////////////////////////////////////////
////   Function Calls & Object Instantiation   /////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

var topBoard = new Battleship(ships);
var bottomBoard = new Battleship(ships);

topBoard.populateOpenSquares();
topBoard.determineShipOrientation();
topBoard.getShipSquaresKey();
topBoard.generateHorizontalShipLocations();
topBoard.generateVerticalShipLocations();
topBoard.groupShipSquares();

bottomBoard.populateOpenSquares();
bottomBoard.determineShipOrientation();
bottomBoard.getShipSquaresKey();
bottomBoard.generateHorizontalShipLocations();
bottomBoard.generateVerticalShipLocations();
bottomBoard.groupShipSquares();
bottomBoard.renderShipPositions();    // we only render bottom, i.e. the user's ships
bottomBoard.populateOpenSquares();  // repopulates the openSquares for use when tracking which squares CPU has already guessed

console.log(topBoard.horizontalShips);
console.log(topBoard.verticalShips);
console.log(topBoard.shipSquaresKey);
console.log(topBoard.shipSquares);
console.log(topBoard.groupedShipSquares);

console.log(bottomBoard.horizontalShips);
console.log(bottomBoard.verticalShips);
console.log(bottomBoard.shipSquaresKey);
console.log(bottomBoard.shipSquares);

userInput.addEventListener('submit', handleUserSubmit);
