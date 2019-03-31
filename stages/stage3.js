function stage3Constructor() {
  //The constructor for the stage
  instructionStage = 2;
  maxInstruction = instructions[stageNumber].length;
  equationImage = loadImage("images/eqns/acceleration_eqns.jpg");

  initialPosition = createVector(
    floor(random(10, 50)),
    random(80, windowHeight - 80)
  );

  //TODO: make sure the target doesn't cover the image (check ambiguously)
  targetPosition = createVector(windowWidth - 50, initialPosition.y);

  thisBall = new ball(initialPosition, createVector(0, 0), createVector(0, 0));
  thisTarget = new target(targetPosition);

  timerIsActive = false;
  timeElapsed = 0.0;

  textSize(20); //font size
  textBox = createInput();
  textBox.style("color", "#ffffff"); //text color
  textBox.style("background-color", backgroundColor.toString()); //background color
  textBox.style("border", "2px solid #ffffff"); //border styling
  textBox.attribute("type", "number");
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

  if (DEBUG) {
    switch (versionID) {
      case 0:
        console.log(stage3Time);
        break;
      case 1:
        console.log(stage3Vel);
        break;
      case 2:
        console.log(stage3Disp);
        break;
      case 3:
        console.log(stage3Accel);
        break;
    }
  }
}

//------------------------------------------------------------------------------
function drawStage3() {
  //the draw function, called every frame
  if (timerIsActive) {
    drawCurrentElements3();
  }
  if (instructionStage >= instructions[stageNumber].length) {
    stage3LoopAndCheck();
  }

  if (instructionStage < maxInstruction) {
    drawMessage(
      instructions[stageNumber][instructionStage],
      instructionStage,
      true
    );
  }
}

function stage3LoopAndCheck() {
  drawObjectivesStage3();
  drawImageStage3();
  thisTarget.draw();
  thisBall.update();
  thisBall.draw();
  if (isCollided(thisBall, thisTarget)) {
    thisBall.isActive = false;
    clearInterval(timer);
    //timerIsActive = false;
    instructionStage = 1;
  }
}

function drawObjectivesStage3() {
  /*this is where the top left corner box is drawn with the Stage's
   *instructions
   */
}

//------------------------------------------------------------------------------
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
              instructionStage = 0;
            }
            break;
          case 1:
            if (stage3Vel == enteredValue) {
              correctAnswer3();
            } else {
              instructionStage = 0;
            }
            break;
          case 2:
            if (stage3Disp == enteredValue) {
              correctAnswer3();
            } else {
              instructionStage = 0;
            }
            break;
          case 3:
            if (stage3Accel == enteredValue) {
              correctAnswer3();
            } else {
              instructionStage = 0;
            }
            break;
        }
        break; //break the enter case
    }
    return; //return from the keyPressed function
  }
  if (instructionStage <= maxInstruction && instructionStage > 1) {
    //catch any key and run the function if there is more instructions to show
    instructionStage++;
  }
  if (instructionStage == 1) {
    changeScore(18);
    incrimentStage();
  }
  if (instructionStage == 0) {
    changeScore(-2);
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

//------------------------------------------------------------------------------
function drawImageStage3() {
  drawImage(equationImage, 150, 150);
}

function drawObjectivesStage3() {
  stroke(0);
  strokeWeight(3);
  noFill();
  rect(0, 0, 225, 90);
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
      text("Init. Velocity : 0m/s", 10, textAscent() * 5 + 30);
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
      text("Init. Velocity : 0m/s", 10, textAscent() * 5 + 30);
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
      text("Init. Velocity : 0m/s", 10, textAscent() * 5 + 30);
      break;
    case 3:
      text("Displacement   : " + stage3Disp + "m", 10, textAscent() + 10);
      text("Time           : " + stage3Time + "s", 10, textAscent() * 2 + 15);
      text("+x Acceleration: ?", 10, textAscent() * 3 + 20);
      text("Final Velocity : " + stage3Vel + "m/s", 10, textAscent() * 4 + 25);
      text("Init. Velocity : 0m/s", 10, textAscent() * 5 + 30);
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
  stroke(18, 186, 0);
  fill(18, 186, 0);
  textAlign(CENTER);
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
    windowWidth / 2,
    windowHeight / 2
  );
  textAlign(LEFT);
}
