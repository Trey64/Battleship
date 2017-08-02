'use strict';

// function validation() {
//
//   swal( title: "Welcome User!",
//   text: "Let's Play!",
//   imageUrl: "images/thumbs-up.jpg");
// }

var gameInfo = [];


var userInfo = document.getElementById('user_info');
userInfo.addEventListener('submit', eventHandler);


//event handler function
function eventHandler(event) {

  event.preventDefault();

  var userName = event.target.username.value;
  var difficulty = event.target.dropMenu.value;

  event.target.username.value = null;
  event.target.dropMenu.value = null;

  // pushing the values
  gameInfo.push(userName);
  gameInfo.push(difficulty);

  if (userName === null || difficulty === null) {
    alert('Please fill in all fields');
  } else {
    localStorage.gameInfo = JSON.stringify(gameInfo);
    location.href = 'game.html';
  }

}
