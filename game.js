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

function randomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
