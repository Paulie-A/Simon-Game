var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

//tracks if the game has started
var started = false;
//variable to game to start at 0
var level = 0;

//keypress listener to start the gamePattern
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//Event listener to log buttons clicked
$(".btn").click(function() {
//Store id of the button which was clicked
  var userChosenColour = $(this).attr("id");
  //add the contents of var userChosenColour to the userClickedPattern
  userClickedPattern.push(userChosenColour);
  //run function to play sound for the clicked button
  playSound(userChosenColour);
//run function to animate button press
  animatePress(userChosenColour);
  //call checkanswer() after user has chosen answer and pass the index of the last answer in the users sequence
  checkAnswer(userClickedPattern.length-1);
});

//function to check answer
function checkAnswer(currentLevel) {
  //if statement to check if most recent answer is the same as gamepattern
if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
  console.log("success");
//if most recent answer is correct, check the user has finished the sequence
  if (userClickedPattern.length === gamePattern.length) {
    setTimeout(function () {
      nextSequence();
    }, 1000);
  }
} else {
  //if anser is wrong, play wrong sound, add and remove game over class and call function to restart game
  console.log("wrong");
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
  $("#level-title").text("Game Over, Press Any Key To Restart");
  startOver();
}
}

//function to Generate a random number
function nextSequence() {
  //once sequence is triggered, reset userClickedPattern to an empty array for the next level
  userClickedPattern = [];
//increase level by 1 every time nextSequence is called
  level++;
//update h1 for every change in level
  $("#level-title").text("Level " + level);

var randomNumber = Math.floor(Math.random() * 4);
//Use randomNumber to select a button colour
var randomChosenColour = buttonColours[randomNumber];
//Add randomChosenColour to gamePattern
gamePattern.push(randomChosenColour);
//1. Use jquery to select the button with same id as randomChosenColour
//2. animate the button with a flash effect
//3. play the correct audio file in relation to randomChosenColour
$("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(randomChosenColour);
}

//function to restart the game
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}



//function to play sound for the corresponding button
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//Function to animate button press
function animatePress(currentColour) {
  //add Pressed class to button
  $("#" + currentColour).addClass("pressed");
//remove Pressed class after 100ms with setTimeout
setTimeout(function () {
  $("#" + currentColour).removeClass("pressed");
}, 100);
}
