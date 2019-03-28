function stage4Constructor() {
  //The constructor for the stage
  instructionStage = 2;
  maxInstruction = instructions[stageNumber].length;
  equationImage = loadImage("images/eqns/acceleration_eqns.jpg");

  ballPosition = createVector(
    floor(random(10, 50)),
    random(80, (windowHeight * 2) / 3)
  );
  targetPosition = createVector(
    windowWidth - 50,
    roundToFixed(random(ballPosition.y, windowHeight - 80), 2)
  );

  thisTarget = new target(targetPosition, 19);
  stage4Acceleration = roundToFixed(random(100, 500), 2);
  thisBall = new ball(
    ballPosition,
    createVector(0, 0),
    createVector(0, stage4Acceleration)
  );

  textSize(20); //font size
  textBox = createInput();
  textBox.style("color", "#ffffff"); //text color
  textBox.style("background-color", backgroundColor.toString()); //background color
  textBox.style("border", "2px solid #ffffff"); //border styling
  textBox.attribute("type", "number");
  textBox.position(windowWidth / 2 - 150, windowHeight / 2 - 300); //position of lower left corner
  textBox.size(300, textAscent()); //size of the textbox

  stage4HorDisp = roundToFixed(thisTarget.position.x - thisBall.position.x, 2);
  stage4VerDisp = roundToFixed(thisTarget.position.y - thisBall.position.y, 2);
  stage4Time = sqrt((2 * stage4VerDisp) / stage4Acceleration);
  stage4Vel = roundToFixed(stage4HorDisp / stage4Time, 2);

  //// DEBUG:
  if (DEBUG) {
    console.log(stage4Vel);
  }
}

function drawStage4() {
  //the draw function, called every frame
  if (instructionStage >= instructions[stageNumber].length) {
    stage4LoopAndCheck();
  }

  if (instructionStage < maxInstruction) {
    drawMessage(
      instructions[stageNumber][instructionStage],
      instructionStage,
      true
    );
  }
}

function stage4LoopAndCheck() {
  drawObjectivesStage4();
  drawImageStage4();
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

function drawObjectivesStage4() {
  /*this is where the top left corner box is drawn with the Stage's
   *instructions
   */
  stroke(0);
  strokeWeight(3);
  noFill();
  rect(0, 0, 325, 80);
  strokeWeight(1);
  fill(0);
  textSize(12);
  text(
    "x Displacement           : " + stage4HorDisp + "m",
    10,
    textAscent() + 10
  );
  text(
    "Change in y Displacement : " + stage4VerDisp + "m",
    10,
    textAscent() * 2 + 15
  );
  text(
    "-y Acceleration          : " + stage4Acceleration + "m/s^2",
    10,
    textAscent() * 3 + 20
  );
  text("x velocity               : ?", 10, textAscent() * 4 + 25);
}

function stage4KeyPressed(value) {
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

function stage4MouseClicked() {
  //executed when the mouse is clicked and we're on stage 4
}

function stage4Resized() {
  //called when the window is resized and we're on stage number
  //allows changing the size of stage-specific objects
  textBox.position(windowWidth / 2 - 150, windowHeight / 2 - 300); //position of lower left corner
}

function drawImageStage4() {
  drawImage(equationImage, 150, 150);
}

function stage4Resized() {
  stage4HorDisp = roundToFixed(thisTarget.position.x - thisBall.position.x, 2);
  stage4VerDisp = roundToFixed(thisTarget.position.y - thisBall.position.y, 2);
  stage4Time = sqrt((2 * stage4VerDisp) / stage4Acceleration);
  stage4Vel = roundToFixed(stage4HorDisp / stage4Time, 2);
}
