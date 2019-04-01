function stage5Constructor() {
  //The constructor for the stage
  instructionStage = 2;
  maxInstruction = instructions[stageNumber].length;
  equationImage = loadImage("images/eqns/acceleration_eqns.jpg");
  newBackgroundColor = color("#c1440e");
  backgroundColorChanged = true;
  ballPosition = createVector(
    floor(random(10, 50)),
    random(80, (windowHeight * 2) / 3)
  );

  //TODO: make sure the target doesn't cover the image (check ambiguously)
  targetPosition = createVector(
    windowWidth - 50,
    random(ballPosition.y + 100, windowHeight - 80)
  );

  thisTarget = new target(targetPosition, 19);
  stage5YAcceleration = roundToFixed(random(100, 500), 2);
  stage5XAcceleration = roundToFixed(random(100, 500), 2);
  thisBall = new ball(
    ballPosition,
    createVector(0, 0),
    createVector(stage5XAcceleration, stage5YAcceleration)
  );
  stage5VerDisp = roundToFixed(targetPosition.y - ballPosition.y, 2);
  stage5HorDisp = roundToFixed(targetPosition.x - ballPosition.x, 2);
  stage5Time = sqrt((2 * stage5VerDisp) / stage5YAcceleration);
  stage5InitVel = roundToFixed(
    (stage5HorDisp - 0.5 * stage5XAcceleration * pow(stage5Time, 2)) /
      stage5Time,
    2
  );
  //^^I think this is right.

  if (DEBUG) {
    console.log(stage5InitVel);
  }
  timerIsActive = false;
  timeElapsed = 0.0;
}

function drawStage5() {
  //the draw function, called every frame

  if (createTextBox) {
    textSize(20); //font size
    textBox = createInput();
    textBox.style("color", "#ffffff"); //text color
    textBox.style("background-color", newBackgroundColor.toString()); //background color
    textBox.style("border", "2px solid #ffffff"); //border styling
    textBox.attribute("type", "number");
    textBox.position(windowWidth / 2 - 150, windowHeight / 2 - 300); //position of lower left corner
    textBox.size(300, textAscent()); //size of the textbox
    createTextBox = false;
  }

  if (timerIsActive) {
    drawCurrentElements5();
  }

  //determines if the game loop should be run, or if the instructions should be shown
  if (instructionStage >= maxInstruction) {
    stage5LoopAndCheck();
  }
  //TODO:change to else if ???
  if (instructionStage < maxInstruction) {
    drawMessage(
      instructions[stageNumber][instructionStage],
      instructionStage,
      true
    );
  }
}

//this is the actual game loop, run if there are no instructions to show
function stage5LoopAndCheck() {
  drawObjectivesStage5();
  drawImageStage5();
  thisBall.update();
  thisBall.draw();
  thisTarget.draw();
  if (isCollided(thisBall, thisTarget)) {
    thisBall.isActive = false;
    clearInterval(timer);
    instructionStage = 1;
  }
  if (outOfBounds(thisBall)) {
    instructionStage = 0; //ya don goofed
  }
}

function drawObjectivesStage5() {
  stroke(255);
  strokeWeight(3);
  noFill();
  rect(0, 0, 325, 95);
  strokeWeight(1);
  fill(255);
  textSize(12);
  text(
    "Change in x Displacement : " + stage5HorDisp + "m",
    10,
    textAscent() + 10
  );
  text(
    "Change in y Displacement : " + stage5VerDisp + "m",
    10,
    textAscent() * 2 + 15
  );
  text(
    "-y Acceleration          : " + stage5YAcceleration + "m/s^2",
    10,
    textAscent() * 3 + 20
  );
  text(
    "+x Acceleration          : " + stage5XAcceleration + "m/s^2",
    10,
    textAscent() * 4 + 25
  );
  text("x velocity               : ?", 10, textAscent() * 5 + 30);
}

function stage5KeyPressed(value) {
  /*this is called when a key is pressed and it is on this stage
   *value has the value of the key pressed,
   * we can figure out which number each key is by calling
   *console.log(value) and press a key and note the number in the console
   */
  if (instructionStage > maxInstruction) {
    switch (value) {
      case 32: //32 = space
        break;
      case 13:
        //handle enter
        enteredValue = parseFloat(textBox.value());
        textBox.attribute("hidden", true);
        thisBall.changeVelocity(createVector(enteredValue, 0));
        thisBall.isActive = true;
        timerIsActive = true;
        timer = setInterval(incrimentTimer, 10);
        break;
    }
  }
  if (instructionStage <= maxInstruction && instructionStage > 1) {
    //catch any key and run the function if there is more instructions to show
    instructionStage++;
  }
  if (instructionStage == 1) {
    clearInterval(timer);
    changeScore(20);
    incrimentStage();
  }
  if (instructionStage == 0) {
    changeScore(-5);
    resetStage();
  }
}

function stage5MouseClicked() {
  //executed when the mouse is clicked and we're on stage 5
}

function stage5Resized() {
  //called when the window is resized and we're on stage number
  //allows changing the size of stage-specific objects
  textBox.position(windowWidth / 2 - 150, windowHeight / 2 - 300); //position of lower left corner
}
function drawImageStage5() {
  drawImage(equationImage, 150, 150);
}
//__________________________________________________________
function drawCurrentElements5() {
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
      "x Displacement: " +
      String(roundToFixed(thisTarget.position.x - thisBall.position.x), 2) +
      "m\n" +
      "y Displacement: " +
      String(roundToFixed(thisTarget.position.y - thisBall.position.y), 2) +
      "m\n" +
      "Acceleration: " +
      roundToFixed(thisBall.acceleration.mag(), 2) +
      "m/s^2" +
      "\n" +
      "velocity: " +
      roundToFixed(thisBall.velocity.mag(), 2) +
      "m/s",
    windowWidth / 2,
    windowHeight / 2 - 75
  );
  textAlign(LEFT);
}
