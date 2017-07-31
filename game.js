'use strict';

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


function determineShipOrientation(shipArray, horizontalShips, verticalShips) {
  for (var i = 0; i < shipArray.length; i++){
    var randomNum = rand(0, 1);
    if (randomNum === 0){
      verticalShips.push(shipArray[i]);
    } else {
      horizontalShips.push(shipArray[i]);
    }
  }
}

// Randomly generates the positions of the horizontal ships
// openSpaces will be the open spaces available to place a shipSpaces
// shipSpaces will be the squares that contain a ship
// horinzotalShips will contain the lengths of the horizontal ships (that we will place)
function generateHorizontalShipLocations(openSpaces, shipSpaces, horizontalShips) {

  for (var i = 0; i < horizontalShips.length; i++) {

    // since it is from the openSpaces array, the starting square will always be valid
    var startingSquare = openSpace[rand(0, openSpace.length)]; // a random square from the openSpaces array
    var endingSquare = startingSquare + horizontalShips[i];


    // checks which row the startingSquare and endingSquare are on
    var startingSquareRow = Math.floor(startingSquare / 10);
    var endingSquareRow = Math.floor(endingSquare / 10);

    // Fix the position of the ship, if the position
    // if startingSquare and endingSquare are not on the same row, then have to pick another square
    while (endingSquareRow - startingSquareRow !== 0) {
      startingSquare = openSpace[rand(0, openSpace.length)];
      endingSquare = startingSquare + horizontalShips[i];
    }

    var shipCoordinates = [];

    // make an array of the ship coordinates
    //      for example for a ship of length 3 starting at 48: [48, 49, 50]
    for (var j = 0; j < horizontalShips[i]; j++) {
      shipCoordinates[j] = (startingSquare + j);
    }

  }

}

function rand (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


for (var i = 0; i <= 99; i++) {
  topOpenSpaces.push(i);
  bottomOpenSpaces.push(i);
}

function spaceRows() {
  for (var i = 0; i < openSpaces.length; i++) {

  }
}
