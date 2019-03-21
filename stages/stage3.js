function stage3Constructor() {
  //The constructor for the stage
  instructionStage = 1;
  maxInstruction = 3;
  equationImage = loadImage("images/acceleration_eqns.jpg");

  initialPosition = createVector(
    floor(random(10, 50)),
    random(80, windowHeight - 80)
  );

  targetPosition = createVector(windowWidth - 50, initialPosition.y);

  thisBall = new ball(initialPosition, createVector(0, 0), createVector(0, 0));
  thisTarget = new target(targetPosition);

  timerIsActive = false;
  timeElapsed = 0.0;

  textSize(20); //font size
  textBox = createInput();
  textBox.style("color", "#ffffff"); //text color
  textBox.style("background-color", "#87cefa"); //background color
  textBox.style("border", "2px solid #ffffff"); //border styling
  textBox.position(windowWidth / 2 - 150, windowHeight / 2 - 300); //position of lower left corner
  textBox.size(300, textAscent()); //size of the textbox

  versionID = int(random(0, 4)); // 0,1,2,3

  stage3Time = roundToFixed(random(3, 10), 2);
  stage3Disp = roundToFixed(
    thisBall.position.dist(thisTarget.position) -
      thisTarget.radius -
      thisBall.radius,
    2
  );
  stage3Accel = roundToFixed((2 * stage3Disp) / pow(stage3Time, 2), 2);
  stage3Vel = roundToFixed(sqrt(2 * stage3Accel * stage3Disp), 2); //this is the final velocity

  //overwrite the ball variable because we now know the acceleration
  thisBall = new ball(
    initialPosition,
    createVector(0, 0),
    createVector(stage3Accel, 0)
  );
}

function drawStage3() {
  //the draw function, called every frame
  if (
    (instructionStage > maxInstruction) |
    ((instructionStage == 0) | (instructionStage == -1))
  ) {
    drawObjectivesStage3();
    drawImageStage3();
  }

  if (timerIsActive) {
    drawCurrentElements3();
  }

  switch (instructionStage) {
    case -1:
      //failure instruction
      drawMessage(":-(\n" + enteredValue + " is not correct", true);
      break;
    case 0:
      //success instruction
      drawMessage("Success!", true);
      break;
    case 1:
      drawMessage(
        "Previously, you haven't had to worry about \nany acceleration or changing the velocity. \nThat is no longer the case. ",
        true
      );
      break;
    case 2:
      drawMessage(
        "In this stage, we begin to deal with gravity.\nTypically, gravity works in the Y direction, \nbut in this stage, it works in the \n+x direction. ",
        true
      );
      break;
    case 3:
      drawMessage(
        "For this stage, you will be given 3 of \nthe following: \ntime, distance, acceleration, final velocity\n\nYou will have to solve for one of \nthese values",
        true
      );
      break;
    /*
      ...
      */
    default:
      thisTarget.draw();
      thisBall.update();
      thisBall.draw();
      if (isCollided(thisBall, thisTarget)) {
        thisBall.isActive = false;
        clearInterval(timer);
        //timerIsActive = false;
        instructionStage = 0;
      }
      break;
  }
}

function drawObjectivesStage3() {
  /*this is where the top left corner box is drawn with the Stage's
   *instructions
   */
}

function stage3KeyPressed(value) {
  if (instructionStage > maxInstruction) {
    switch (value) {
      case 32: //32 = space
        thisBall.isActive = !thisBall.isActive;
        break;
      case 13:
        //handle enter
        enteredValue = parseFloat(textBox.value());
        /*IDs:
         *  0: given distance, acceleration, finalVelocity (solve for time)
         *  1: given distance, time, acceleration (solve for finalVelocity)
         *  2: given time, finalVelocity, acceleration (solve for distance)
         *  3: given time, finalVelocity, distance (solve for acceleration)
         */
        switch (versionID) {
          case 0:
            if (stage3Time == enteredValue) {
              correctAnswer3();
            } else {
              instructionStage = -1;
            }
            break;
          case 1:
            if (stage3Vel == enteredValue) {
              correctAnswer3();
            } else {
              instructionStage = -1;
            }
            break;
          case 2:
            if (stage3Disp == enteredValue) {
              correctAnswer3();
            } else {
              instructionStage = -1;
            }
            break;
          case 3:
            if (stage3Accel == enteredValue) {
              correctAnswer3();
            } else {
              instructionStage = -1;
            }
            break;
        }
        break; //break the enter case
    }
    return; //return from the keyPressed function
  }
  if (instructionStage <= maxInstruction && instructionStage > 0) {
    //catch any key and run the function if there is more instructions to show
    instructionStage++;
  }
  if (instructionStage == 0) {
    textBox.remove();
    incrimentStage();
  }
  if (instructionStage == -1) {
    textBox.remove();
    resetStage();
  }
}

function stage3MouseClicked() {
  //executed when the mouse is clicked and we're on stage 3
}

function stage3Resized() {
  //called when the window is resized and we're on stage number
  //allows changing the size of stage-specific objects
  textBox.position(windowWidth / 2 - 150, windowHeight / 2 - 300);
}

function drawImageStage3() {
  drawImage(equationImage, 150, 150);
}

function drawObjectivesStage3() {
  stroke(0);
  strokeWeight(3);
  noFill();
  rect(0, 0, 225, 75);
  strokeWeight(1);
  fill(0);
  textSize(12);
  /*IDs:
   *  0: given distance, acceleration, finalVelocity (solve for time)
   *  1: given distance, time, acceleration (solve for finalVelocity)
   *  2: given time, finalVelocity, acceleration (solve for distance)
   *  3: given time, finalVelocity, distance (solve for acceleration)
   */
  switch (versionID) {
    case 0:
      text("Displacement   : " + stage3Disp + "m", 10, textAscent() + 10);
      text("Time           : ?", 10, textAscent() * 2 + 15);
      text(
        "+x Acceleration: " + stage3Accel + "m/s^2",
        10,
        textAscent() * 3 + 20
      );
      text("Final Velocity : " + stage3Vel + "m/s", 10, textAscent() * 4 + 25);
      break;
    case 1:
      text("Displacement   : " + stage3Disp + "m", 10, textAscent() + 10);
      text("Time           : " + stage3Time + "s", 10, textAscent() * 2 + 15);
      text(
        "+x Acceleration: " + stage3Accel + "m/s^2",
        10,
        textAscent() * 3 + 20
      );
      text("Final Velocity : ?", 10, textAscent() * 4 + 25);
      break;
    case 2:
      text("Displacement   : ?", 10, textAscent() + 10);
      text("Time           : " + stage3Time + "s", 10, textAscent() * 2 + 15);
      text(
        "+x Acceleration: " + stage3Accel + "m/s^2",
        10,
        textAscent() * 3 + 20
      );
      text("Final Velocity : " + stage3Vel + "m/s", 10, textAscent() * 4 + 25);
      break;
    case 3:
      text("Displacement   : " + stage3Disp + "m", 10, textAscent() + 10);
      text("Time           : " + stage3Time + "s", 10, textAscent() * 2 + 15);
      text("+x Acceleration: ?", 10, textAscent() * 3 + 20);
      text("Final Velocity : " + stage3Vel + "m/s", 10, textAscent() * 4 + 25);
      break;
  }
}
function correctAnswer3() {
  textBox.attribute("hidden", true);
  thisBall.isActive = true;
  timerIsActive = true;
  timer = setInterval(incrimentTimer, 10);
}

function drawCurrentElements3() {
  currentDisplacement = roundToFixed(
    thisBall.position.dist(thisTarget.position) -
      thisTarget.radius -
      thisBall.radius,
    2
  );
  if (currentDisplacement < 0.0) {
    //catch if the displacement is less than zero
    currentDisplacement = 0;
  }
  textSize(20);
  text(
    "Time: " +
      roundToFixed(timeElapsed, 2) +
      "s" +
      "\n" +
      "Displacement: " +
      currentDisplacement +
      "m" +
      "\n" +
      "Acceleration: " +
      roundToFixed(thisBall.acceleration.mag(), 2) +
      "m/s^2" +
      "\n" +
      "velocity: " +
      roundToFixed(thisBall.velocity.mag(), 2) +
      "m/s",
    windowWidth / 2 - 146,
    windowHeight / 2
  );
}
