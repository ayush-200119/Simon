//can add timing where we have to answer within specifictime.
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var started = "false"; //used to indicate the start of the game
var level = 0;
var userClickedPattern = [];
var highScore = 0;

//userClickedPattern and gamePattern are checked for the sattus of the game.

//starting when keypress detected
$(document).keypress(function() {
  if (started !== "true") {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = "true";
  }
});

//checks and updates the user Pattern
$(".btn").click(function(event) {
  if (started === "true") {
    var userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1); //will pass the index and check the same element in the gamePattern array for equality
  }
  //checks wheter a button is pressed without the game being started
  else {
    alert("Press a key to start!");
  }
});

var i=0;

function animateAndPlay()
{
  setTimeout(function(){
    if(i<gamePattern.length)
    {
      playSound(gamePattern[i]);
      $("#"+gamePattern[i]).fadeIn(80).fadeOut(80).fadeIn(80);
      i++;
      animateAndPlay();
    }


  },500);
}

// This function generates a random number and selects a randomColor from the array and pushes it to gamepattern
function nextSequence() {

  //clearing userPattern
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  //game pattern updation done here
  gamePattern.push(randomChosenColor);
  //sound and animation

  //playing only last added color
  // playSound(randomChosenColor);
  // $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);//adds a animation effect to the button

  i=0;
  animateAndPlay();


}


//This function will check the userClickedPattern and gamePattern in the sequence for the result
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    //final checking if both become equal then the user has entered all button
    //in the correct oreder wait for the next entries
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 800);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over"); //adding the gameOver effect
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over press any key to start again");
    startOver();
  }
}

//This function takes a string as a argument and sets it to a path and plays it
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//This function will animate the clicked button(adding the pressed class)
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//This function will reset the values of the game
function startOver() {
  gamePattern = [];
  // if (started === "true")
  //   setHighScore(level);

  started = "false";
  level = 0;
}

//adding a database
//can work on features where the timeout decreases
//can add a timer for high levels

//
// function setHighScore(score) {
//   //default score setting
//   if (highScore === 0 && score > 0) {
//     highScore = score;
//     alert("Your Score:" + score + "  and the High Score:" + highScore);
//     $("#level-title").before("<h1 class='win'>High Score record broken!</h1>");
//     setTimeout(function() {
//       $(".win").remove();
//     }, 5000);
//   }
//   //Score updation
//   else if (score > highScore) {
//     highScore = score;
//     alert("Your Score:" + score + "  and the High Score:" + highScore);
//     $("#level-title").before("<h1 class='win'>High Score record broken!</h1>");
//     setTimeout(function() {
//       $(".win").remove();
//     }, 5000);
//   }
//   //Score less than the high score
//   else {
//     alert("Your Score:" + score + "  and the High Score:" + highScore);
//     $("#level-title").before("<h1 class='loose'>Better luck next time!</h1>");
//     setTimeout(function() {
//       $(".loose").remove();
//     }, 5000);
//   }
// }
