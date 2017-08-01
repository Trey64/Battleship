'use strict';

var ships = [2, 3, 3, 4, 5];

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

// method for each battleship object to randomly determine which ships are vertical
//   and which ships are horizontal
Battleship.prototype.determineShipOrientation = function() {
  for (var i = 0; i < this.shipSizes; i++) {
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

var topBoard = new Battleship(ships);
var bottomBoard = new Battleship(ships);

topBoard.determineShipOrientation();
topBoard.generateHorizontalShipLocations();
topBoard.generateVerticalShipLocations();

bottomBoard.determineShipOrientation();
bottomBoard.generateHorizontalShipLocations();
bottomBoard.generateVerticalShipLocations();

// returns an integer between the passed min and max parameters (both ends inclusve)
function randomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function determineShipOrientation(shipArray, horizontalShips, verticalShips) {
  for (var i = 0; i < shipArray.length; i++){
    if (randomNumber(0, 1) === 0){
      verticalShips.push(shipArray[i]);
    } else {
      horizontalShips.push(shipArray[i]);
    }
  }
}

//Top Board
var topOpenSpaces = [];
var topShipSpaces = [];
var topHits = [];
var topMisses = [];
var topHorizontalShips = [];
var topVerticalShips = [];
var topShipLengths = [2, 3, 3, 4, 5];
//Bottom Board
var bottomOpenSpaces = [];
var bottomShipSpaces = [];
var bottomHits = [];
var bottomMisses = [];
var bottomHorizontalShips = [];
var bottomVerticalShips = [];
var bottomShipLengths = [2, 3, 3, 4, 5];



// Randomly generates the positions of the horizontal ships
// openSpaces will be the open spaces available to place a shipSpaces
// shipSpaces will be the squares that contain a ship
// horinzotalShips will contain the lengths of the horizontal ships (that we will place)
function generateHorizontalShipLocations(openSpaces, shipSpaces, horizontalShips) {

  for (var i = 0; i < horizontalShips.length; i++) {

    // since it is from the openSpaces array, the starting square will always be valid
    var startingSquare = openSpaces[randomNumber(0, openSpaces.length)];
    var endingSquare = startingSquare + (horizontalShips[i] - 1);

    // checks which row the startingSquare and endingSquare are on
    var startingSquareRow = Math.floor(startingSquare / 10);
    var endingSquareRow = Math.floor(endingSquare / 10);

    // gets the index of the starting and ending squares in the open spaces array
    var indexOfStartingSquare = openSpaces.indexOf(startingSquare);
    var indexOfEndingSquare = openSpaces.indexOf(endingSquare);

    // Fixes the position of the ship
    while (endingSquareRow - startingSquareRow !== 0 || shipSpaces.includes(startingSquareRow) || shipSpaces.includes(endingSquareRow) || indexOfEndingSquare - indexOfStartingSquare !== (horizontalShips[i] - 1) || typeof startingSquare !== 'number') {
      startingSquare = openSpaces[randomNumber(0, openSpaces.length)];
      endingSquare = startingSquare + (horizontalShips[i] - 1);
      startingSquareRow = Math.floor(startingSquare / 10);
      endingSquareRow = Math.floor(endingSquare / 10);
      indexOfStartingSquare = openSpaces.indexOf(startingSquare);
      indexOfEndingSquare = openSpaces.indexOf(endingSquare);
    }

    // Adds the ship's coordinates to the shipSpaces array and removes them from the open spaces array
    for (var j = 0; j < horizontalShips[i]; j++) {
      var tempShipCoordinate = startingSquare + j;
      shipSpaces.push(tempShipCoordinate);
      openSpaces.splice(openSpaces.indexOf(tempShipCoordinate), 1);
    }
  }
}

// Randomly generates the positions of the vertical ships
// openSpaces will be the open spaces available to place a shipSpaces
// shipSpaces will be the squares that contain a ship
// verticalShips will contain the lengths of the vertical ships (that we will place)
function generateVerticalShipLocations(openSpaces, shipSpaces, verticalShips) {

  for (var i = 0; i < verticalShips.length; i++) {

    // since it is from the openSpaces array, the starting square will always be valid
    var startingVerticalSquare = openSpaces[randomNumber(0, openSpaces.length)];

    while(startingVerticalSquare >= 80) {
      startingVerticalSquare = openSpaces[randomNumber(0, openSpaces.length)];
    }

    var endingVerticalSquare = startingVerticalSquare + ((verticalShips[i] - 1) * 10);

    var thisShipCoordinates = [];

    for (var j = 0; j < verticalShips[i]; j++) {
      thisShipCoordinates[j] = startingVerticalSquare + (10 * j);
    }

    // helper function to check if any of this vertical ship coordinates are already taken
    var checkIfContains = function(haystack, arr) {
      return arr.some(function (v) {
        return haystack.indexOf(v) >= 0;
      });
    };

    while (endingVerticalSquare >= 99 || checkIfContains(shipSpaces, thisShipCoordinates) || typeof startingVerticalSquare !== 'number') {
      startingVerticalSquare = openSpaces[randomNumber(0, openSpaces.length)];
      endingVerticalSquare = startingVerticalSquare + ((verticalShips[i] - 1) * 10);
      for (var k = 0; k < verticalShips[i]; k++) {
        thisShipCoordinates[k] = startingVerticalSquare + (10 * k);
      }
    }

    // Adds the ship's coordinates to the shipSpaces array and removes them from the open spaces array
    for (var p = 0; p < verticalShips[i]; p++) {
      var tempShipCoordinate = startingVerticalSquare + (p * 10);
      shipSpaces.push(tempShipCoordinate);
      openSpaces.splice(openSpaces.indexOf(tempShipCoordinate), 1);
    }
  }
}


function createOpenSpaces() {
  for (var i = 0; i <= 99; i++) {
    topOpenSpaces.push(i);
    bottomOpenSpaces.push(i);
  }
}

function renderBottomShips() {
  for (var i = 0; i < bottomShipSpaces.length; i++) {

    // get the td element id
    var tdIdentifier = 'b' + bottomShipSpaces[i];

    // give the corresponding squares color
    var tdEl = document.getElementById(tdIdentifier);
    tdEl.style.backgroundColor = 'gray';
  }
}

createOpenSpaces();

determineShipOrientation(topShipLengths, topHorizontalShips, topVerticalShips);
determineShipOrientation(bottomShipLengths, bottomHorizontalShips, bottomVerticalShips);

generateVerticalShipLocations(topOpenSpaces, topShipSpaces, topVerticalShips);
generateHorizontalShipLocations(topOpenSpaces, topShipSpaces, topHorizontalShips);

generateVerticalShipLocations(bottomOpenSpaces, bottomShipSpaces, bottomVerticalShips);
generateHorizontalShipLocations(bottomOpenSpaces, bottomShipSpaces, bottomHorizontalShips);

renderBottomShips();
