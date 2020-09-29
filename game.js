let buttonColors = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;

//after keypress checks if document is started if not displays level number
$(document).keypress(function(){
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {
  //Selects the id of the user clicked color
  let userChosenColor = $(this).attr("id");

  //Adds the pattern that the user clicked the array
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);

});

//returns a random number 0-3
function nextSequence() {
  //Once nextSequence() is triggered, reset the userClickedPattern to an empty array
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);
  //1: Generates Random Numer
  let randomNumber = Math.floor(Math.random() * 4);
  //2: Uses the Random Number to pick the color out of the array
  let randomChosenColor = buttonColors[randomNumber];
  //3: Pushes the color onto the gamePattern array
  gamePattern.push(randomChosenColor);

  //Uses the chosen random color to add a flashing animation
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);


}

function playSound(name){
  //plays the audio to correspond to the chosen color
  let buttonAudio = new Audio("sounds/"+ name + ".mp3");
  buttonAudio.play();
}

function animatePress(currentColor) {
  //Adds pressed class
    $("#" + currentColor).addClass("pressed");

  //removes press class after 100 ms
  setTimeout( function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
            nextSequence();
          }, 1000);
    }

  }else {
    playSound("wrong");
    $("body").addClass("game-over");

    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }

}

function startOver(){
  level = 0;
  started = false;
  gamePattern = [];
}
