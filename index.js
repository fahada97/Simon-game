var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

$(document).keydown(function() {
  if (!started){
    $("#level-title").text("level " + level);
    nextSequence();
    started = true;
  }
});

function nextSequence() {
  userClickedPattern = [];

  level++;
  $("#level-title").text("level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  var sound = new Audio("sounds/" + randomChosenColor + ".mp3");
  sound.play();

  }


$(".btn").on("click", function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animateClick(userChosenColor);

  checkAnswer(userClickedPattern.length -1);
});



function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function animateClick(name) {
  //console.log(name);
  $("." + name).addClass("pressed");
  setTimeout(function() {
    $("." + name).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){

      console.log("success");

      if(userClickedPattern.length === gamePattern.length){
        setTimeout(function(){nextSequence()}, 1000);
      }

    }
    else {

      console.log("fail");
      playSound("wrong");

      $("body").addClass("game-over");
      setTimeout(function(){$("body").removeClass("game-over")}, 200);
      $("#level-title").text("Game over, press A to continue");

      startOver();
    }
}

function startOver(){
    started = false;
    gamePattern = [];
    level = 0;
}
