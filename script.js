$(document).ready(function() {

  var gameOn = true;
  var player = [];
  var computer = [];
  var playersTurn = false;
  var gameStart = false;
  var count = 0;
  var strictMode = false;
  var win = 20;
  var seqLightSpeed = 300;
  var seqSoundSpeed = 800;
  var winLightSpeed = 200;
  var winSoundSpeed = 200;

  //AUDIO VARIABLES
  var redPlay = new Audio('simonSound1.mp3');
  var bluePlay = new Audio('simonSound2.mp3');
  var yellowPlay = new Audio('simonSound3.mp3');
  var greenPlay = new Audio('simonSound4.mp3');

  //RANDOM NUMBER GENERATOR 0-3
  function randomNumber() {
    var ranNum = Math.round(Math.random() * 3);
    return ranNum;
  }

  //LIGHT PLAY
  function lightPlay(color, speed) {
    $("." + color + "button").toggleClass(color + "-lit");
    var x = setTimeout(function() {
      $("." + color + "button").toggleClass(color + "-lit");

    }, speed);

  }; //LIGHT PLAY CLOSE

  //SOUND PLAY
  function soundLightPlay(speed) {
    playersTurn = false;
    var i = 0;
    var z = setTimeout(function() { //PAUSE AFTER PLAYER ENTERS
        var x = setInterval(function() { //PLAY SEQUENCE

            if (i >= computer.length) {
              clearInterval(x);
              playersTurn = true;
            } else if (computer[i] == 0) {
              lightPlay("red", seqLightSpeed);
              redPlay.play();
              i++;
            } else if (computer[i] == 1) {
              lightPlay("blue", seqLightSpeed);
              bluePlay.play();
              i++;
            } else if (computer[i] == 2) {
              lightPlay("yellow", seqLightSpeed);
              yellowPlay.play();
              i++;
            } else if (computer[i] == 3) {
              lightPlay("green", seqLightSpeed);
              greenPlay.play();
              i++;
            }

          }, 1000) //DELAY BEFORE SEQUENCE STARTS
      }, 800) //SPEED OF SEQUENCE
  }; //SOUNDLIGHT PLAY CLOSE

  //FUNCTION TO START GAME
  function computerGo() {
    playersTurn = false;
    var num = randomNumber();
    computer.push(num);
    soundLightPlay(seqSoundSpeed);
  } //COMPUTERGO CLOSE

  //FUNCTION WRONG
  function wrong() {
    var k = 0;
    var l = 2;

    var z = setTimeout(function() { //PAUSE BEFORE WRONG      
        redPlay.play();
        lightPlay("red", seqLightSpeed);
        bluePlay.play();
        lightPlay("blue", seqLightSpeed);
        yellowPlay.play();
        lightPlay("yellow", seqLightSpeed);
        greenPlay.play();
        lightPlay("green", seqLightSpeed);
        k++;
      }, 500) //TIME BEFORE WRONG STARTS

  }

  //FUNCTION WIN!!
  function winner(speed) {
    var i = 0;
    var winSequence = [0,1,2,3,0,1,2,3];
    var z = setTimeout(function() { //PAUSE AFTER PLAYER ENTERS
        var x = setInterval(function() { //PLAY SEQUENCE
           if (i >= winSequence.length) {
              clearInterval(x);
              playersTurn = true;
            } else if (winSequence[i] == 0) {
              lightPlay("red", winLightSpeed);
							redPlay.currentTime = 0;
              redPlay.play();
              i++;
            } else if (winSequence[i] == 1) {
              lightPlay("blue", winLightSpeed);
							bluePlay.currentTime = 0;
              bluePlay.play();
              i++;
            } else if (winSequence[i] == 2) {
              lightPlay("yellow", winLightSpeed);
							yellowPlay.currentTime = 0;
              yellowPlay.play();
              i++;
            } else if (winSequence[i] == 3) {
              lightPlay("green", winLightSpeed);
							greenPlay.currentTime = 0;
              greenPlay.play();
              i++;
            }

          }, 500) //DELAY BEFORE SEQUENCE STARTS
      }, speed) //SPEED OF SEQUENCE
  }

  //CHECK PLAYER MOVES
  function checkPlayer() {
    var checkTest = 0;

    for (j = 0; j < player.length; j++) { //LOOK FOR ANY WRONGS
      if (player[j] !== computer[j]) {
        checkTest++;
      }
    }
    if (checkTest > 0) { //IF ANY WRONGS, PLAY AGAIN
      if (strictMode == false) { //STRICT MODE OFF
        $(".count").text("! ! !");
        player = [];
        wrong();
        soundLightPlay(seqSoundSpeed);
      } else { //STRICT MODE ON
        $(".count").text("! ! !");
        player = [];
        computer = [];
        wrong();
        count = 0;
        computerGo();
      }
    } else if (player.length == win) {
      player = [];
      computer = [];
      count = 0;
      winner(winSoundSpeed);
      $(".count").text("WIN");
    } else if (player.length == computer.length) { //IF RIGHT, CONTINUE
      player = [];
      count++;
      $(".count").text(count);
      computerGo();
    }
  }

  //START BUTTON
  $(".start").click(function() {
    if (gameStart == false) {
      $(".start").toggleClass("inner-shadow");
      var z = setTimeout(function() {
        $(".start").toggleClass("inner-shadow");
      }, 200)

      $(".count").text(count);
      computerGo();
    }

  });

  //RESET BUTTON
  $(".reset").click(function() {
    $(".reset").toggleClass("inner-shadow");
    var z = setTimeout(function() {
      $(".reset").toggleClass("inner-shadow");
    }, 200)
    computer = [];
    player = [];
    count = 0;
    $(".count").text("--");
  });

  //STRICT BUTTON
  $(".strict").click(function() {
    $(".strict").toggleClass("inner-shadow");
    var z = setTimeout(function() {
      $(".strict").toggleClass("inner-shadow");
    }, 200)
    if (strictMode == false) {
      strictMode = true;
      $(".strict-light").toggleClass("strict-light-on");
    } else {
      strictMode = false;
      $(".strict-light").toggleClass("strict-light-on");
    }
  });

  //BUTTON CLICKS
  $(".redbutton").click(function() {
    if (playersTurn == true) {
      redPlay.play();
      lightPlay("red", seqLightSpeed);
      player.push(0);
      checkPlayer();
    }
  });

  $(".bluebutton").click(function() {
    if (playersTurn == true) {
      bluePlay.play();
      lightPlay("blue", seqLightSpeed);
      player.push(1);
      checkPlayer();
    }
  });

  $(".yellowbutton").click(function() {
    if (playersTurn == true) {
      yellowPlay.play();
      lightPlay("yellow", seqLightSpeed);
      player.push(2);
      checkPlayer();
    }
  });

  $(".greenbutton").click(function() {
    if (playersTurn == true) {
      greenPlay.play();
      lightPlay("green", seqLightSpeed);
      player.push(3);
      checkPlayer();
    }
  });

}); //DOCUMENT READY CLOSE