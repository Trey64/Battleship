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


function determineShipOrientation(shipArray, verticalShips, horizontalShips) {
  for (var i = 0; i < shipArray.length; i++){
    var randomNum = rand(0, 1);
    if (randomNum === 0){
      verticalShips.push(shipArray[i]);
    } else {
      horizontalShips.push(shipArray[i]);
    }
  }
}

function rand (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


for (var i = 1; i <= 100; i++) {
  openSpaces.push(i);
}

function spaceRows() {
  for (var i = 0; i < openSpaces.length; i++) {

  }
}
