$(document).ready(function() {
  console.log('Javascript working');
});

var buttonColors = ["red",'blue','green','yellow'];
var userChosenColor;
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

function nextSequence()   {
  var randomNumber = Math.round(Math.random() * 3) ;
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  console.log($("." + randomChosenColor));
  flash(randomChosenColor);
  playSound(randomChosenColor);
  $('#level-title').text('Level ' + level);
  level++;
  return randomNumber;
}
function flash(btnColor) {
  $("." + btnColor).fadeOut(100).fadeIn(100);
  //var audio = new Audio("sounds/" + btnColor + ".mp3");
  //audio.play();
  playSound(btnColor);
}
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
$(".btn").click(function() {
  if(level == 0) return;
  var userChosenColor = $(this).attr('id');
  console.log("clicked " + userChosenColor );
  userClickedPattern.push(userChosenColor);
  flash(userChosenColor);
  animatePress(userChosenColor);
  playSound(userChosenColor);
  if( userClickedPattern.length == level ) {
    if( checkAnswer()) {
      nextSequence();
      userClickedPattern = [];
    }else {
      gameOver();
    }
  }
})

function animatePress(currentColor) {
  console.log("animate press: " + currentColor);
    $("."  + currentColor).addClass("pressed");
  setTimeout(function() {
    $("."  + currentColor).removeClass("pressed");
  },100);

}
$(document).keypress(function() {
  if(level==0) {
    nextSequence();
  }
});
function checkAnswer() {
    var pos =0;
    while(pos<gamePattern.length) {
      if(gamePattern[pos] != userClickedPattern[pos]) {
        return false;
      }
      pos++;
    }
    return true;
}
function gameOver() {
  $("body").addClass("game-over");
  playSound('wrong');
  setTimeout(function() {
    $('body').removeClass('game-over');
  },200);

  $("#level-title").text('Game Over, Press A Key to Start');
  level = 0;
  userClickedPattern = [];
  gamePattern = [];
}
