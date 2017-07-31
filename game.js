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
    if (randomNumber(0, 1) === 0){
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
    var startingSquare = openSpaces[randomNumber(0, openSpaces.length)];
    var endingSquare = startingSquare + (horizontalShips[i] - 1);


    // checks which row the startingSquare and endingSquare are on
    var startingSquareRow = Math.floor(startingSquare / 10);
    var endingSquareRow = Math.floor(endingSquare / 10);

    // Fixs the position of the ship
    //    if startingSquare and endingSquare are not on the same row, then have to pick another square
    while (endingSquareRow - startingSquareRow !== 0 || shipSpaces.includes(startingSquareRow) || shipSpaces.includes(endingSquareRow)) {
      startingSquare = openSpaces[randomNumber(0, openSpaces.length)];
      endingSquare = startingSquare + horizontalShips[i];
    }

    // Adds the ship's coordinates to the shipSpaces array and removes them from the open spaces array
    for (var j = 0; j < horizontalShips[i]; j++) {
      var thisShipCoordinate = startingSquare + j;
      shipSpaces.push(thisShipCoordinate);
      openSpaces.splice(openSpaces.indexOf(thisShipCoordinate), 1);
    }
  }
}

function generateVeriticalShipLocations(openSpaces, shipSpaces, verticalShips) {

  for (var i = 0; i < verticalShips.length; i++) {

    // since it is from the openSpaces array, the starting square will always be valid
    var startingSquare = openSpaces[randomNumber(0, openSpaces.length)];
    var endingSquare = startingSquare + verticalShips[i];


    // checks which row the startingSquare and endingSquare are on
    var startingSquareRow = Math.floor(startingSquare / 10);
    var endingSquareRow = Math.floor(endingSquare / 10);

    // Fixs the position of the ship
    //    if startingSquare and endingSquare are not on the same row, then have to pick another square
    while (endingSquareRow - startingSquareRow !== 0 || shipSpaces.includes(startingSquareRow) || shipSpaces.includes(endingSquareRow)) {
      startingSquare = openSpaces[randomNumber(0, openSpaces.length)];
      endingSquare = startingSquare + horizontalShips[i];
    }

    // Adds the ship's coordinates to the shipSpaces array and removes them from the open spaces array
    for (var j = 0; j < horizontalShips[i]; j++) {
      var thisShipCoordinate = startingSquare + j;
      shipSpaces.push(thisShipCoordinate);
      openSpaces.splice(openSpaces.indexOf(thisShipCoordinate), 1);
    }
  }
}

function randomNumber(min, max) {
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
