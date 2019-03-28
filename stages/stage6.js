function stage6Constructor() {
  //The constructor for the stage
  instructionStage = 2;
  maxInstruction = instructions[stageNumber].length;
  equationImage = loadImage("images/eqns/acceleration_eqns.jpg");
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
  stage6YAcceleration = roundToFixed(random(100, 500), 2);
  stage6XAcceleration = roundToFixed(random(100, 500), 2);
  thisBall = new ball(
    ballPosition,
    createVector(0, 0),
    createVector(stage6XAcceleration, stage6YAcceleration)
  );
  stage6VerDisp = roundToFixed(targetPosition.y - ballPosition.y, 2);
  stage6HorDisp = roundToFixed(targetPosition.x - ballPosition.x, 2);
  stage6Time = sqrt((2 * stage6VerDisp) / stage6YAcceleration);
  stage6InitVel = roundToFixed(
    (stage6HorDisp - 0.5 * stage6XAcceleration * pow(stage6Time, 2)) /
      stage6Time,
    2
  );

  if (DEBUG) {
    console.log(stage6InitVel);
  }
}

function drawStage6() {
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
  //determines if the game loop should be run, or if the instructions should be shown
  if (instructionStage >= instructions[stageNumber].length) {
    stage6LoopAndCheck();
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
function stage6LoopAndCheck() {
  drawObjectivesStage6();
  drawImageStage5();
  thisBall.update();
  thisBall.draw();
  thisTarget.draw();
  if (isCollided(thisBall, thisTarget)) {
    thisBall.isActive = false;
    instructionStage = 1;
  }
  if (outOfBounds(thisBall)) {
    instructionStage = 0;
  }
}

function drawObjectivesStage6() {
  stroke(255);
  strokeWeight(3);
  noFill();
  rect(0, 0, 255, 80);
  strokeWeight(1);
  fill(255);
  textSize(12);
  text("x Displacement : " + stage6HorDisp + "m", 10, textAscent() + 10);
  text("Change in y Displacement : " + stage6VerDisp + "m", 10, textAscent() * 2 + 15);
  let accelerationString =
    String("acceleration   : " + roundToFixed(thisBall.acceleration.mag(), 2)) +
    String(
      " @ " +
        roundToFixed(360 - degrees(thisBall.acceleration.heading()), 2) +
        "°"
    );
  text(accelerationString, 10, textAscent() * 3 + 20);
    text("x velocity     : ?", 10, textAscent() * 4 + 25); 
}

function stage6KeyPressed(value) {
  /*this is called when a key is pressed and it is on this stage
   *value has the value of the key pressed,
   * we can figure out which number each key is by calling
   *console.log(value) and press a key and note the number in the console
   */
  if (instructionStage > maxInstruction) {
    switch (value) {
      case 32: //32 = space
        thisBall.isActive = !thisBall.isActive;
        break;
      case 13:
        //handle enter
        enteredValue = parseFloat(textBox.value());
        textBox.attribute("hidden", true);
        thisBall.changeVelocity(createVector(enteredValue, 0));
        thisBall.isActive = true;
        break;
      default:
    }
    return;
  }
  if (instructionStage <= maxInstruction && instructionStage > 1) {
    //catch any key and run the function if there is more instructions to show
    instructionStage++;
  }
  if (instructionStage == 1) {
    textBox.remove();
    incrimentStage();
  }
  if (instructionStage == 0) {
    textBox.remove();
    resetStage();
  }
}

function stage6MouseClicked() {
  //executed when the mouse is clicked and we're on stage 6
}

function stage6Resized() {
  //called when the window is resized and we're on stage number
  //allows changing the size of stage-specific objects
  textBox.position(windowWidth / 2 - 150, windowHeight / 2 - 300); //position of lower left corner
}
