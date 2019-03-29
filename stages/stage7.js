function stage7Constructor() {
  //The constructor for the stage
  instructionStage = 2;
  maxInstruction = instructions[stageNumber].length;
  newBackgroundColor = color("#87cefa");
  backgroundColorChanged = true;
  equationImage = loadImage("images/eqns/acceleration_eqns.jpg");

  //reset the clouds
  if (!createTextBox) {
    //this is a trick to prevent a constructor error...
    clouds = [];
    for (var i = 0; i < 6; i++) {
      console.log("creating new cloud");
      clouds.push(new cloud());
    }
  }
  var yPosition = (windowHeight * 2) / 3;
  targetPosition = createVector(
    floor(random(windowWidth / 2 + 150, windowWidth - 19)),
    yPosition
  );
  thisTarget = new target(targetPosition);
  initialPosition = createVector(
    floor(random(10, windowWidth / 2 - 150)),
    yPosition
  );
  thisWall = new wall(
    windowHeight - yPosition + 100,
    windowWidth / 2,
    BOTTOM,
    100
  );

  versionID = floor(random(0, 2));
  /* 0: find angle (initialVelocity, accelerations, time, displacement x)
     1: find inital velocity (angle, accelerations, time, displacement x)*/
  stage7Angle = roundToFixed(random(0, 80), 2);
  //stage7Velocity = roundToFixed(random(100, 300), 2);
  stage7Acceleration = random(100, 500);
  thisBall = new ball(
    initialPosition,
    createVector(0, 0),
    createVector(0, stage7Acceleration)
  );
  stage7HorDisp = p5.Vector.dist(thisBall.position, thisTarget.position);
  stage7Time = sqrt((2 * stage7HorDisp) / stage7Acceleration);
  var verVel = -0.5 * stage7Acceleration * stage7Time;

  var horVel = stage7HorDisp / stage7Time;
  stage7Velocity = createVector(horVel, verVel);
  console.log(stage7Velocity);

  if (versionID == 0) {
    console.log("angle", stage7Angle);
  } else {
    console.log(stage7Velocity);
  }
  //console.log(velocityVector);
}

function drawStage7() {
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
    stage7LoopAndCheck();
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
function stage7LoopAndCheck() {
  drawObjectivesStage7();
  drawImageStage7();
  thisBall.update();
  thisBall.draw();
  thisTarget.draw();
  thisWall.draw();
  if (isCollided(thisBall, thisTarget)) {
    thisBall.isActive = false;
    instructionStage = 1;
  }
  if (outOfBounds(thisBall)) {
    instructionStage = 0;
  }
}

function drawObjectivesStage7() {
  /* 0: find angle (initialVelocity, accelerations, time, displacement x)
     1: find inital velocity (angle, accelerations, time, displacement x)*/
  stroke(0);
  strokeWeight(3);
  noFill();
  rect(0, 0, 325, 80);
  strokeWeight(1);
  fill(0);
  textSize(12);
  text(
    "-y acceleration  : " + roundToFixed(stage7Acceleration, 2) + "m/s^2",
    10,
    textAscent() * 2 + 15
  );
  text(
    "time             : " + roundToFixed(stage7Time, 2) + "s",
    10,
    textAscent() * 3 + 20
  );
  text("change in x      : " + stage7HorDisp + "m", 10, textAscent() * 4 + 25);
  if (versionID == 0) {
    text(
      "Initial Velocity : " + roundToFixed(stage7Velocity.mag(), 2) + "m/s",
      10,
      textAscent() + 10
    );
  } else {
    text(
      "angle            : " + roundToFixed(stage7Velocity.heading(), 2) + "°",
      10,
      textAscent() + 10
    );
  }
}

function stage7KeyPressed(value) {
  /*this is called when a key is pressed and it is on this stage
   *value has the value of the key pressed,
   * we can figure out which number each key is by calling
   *console.log(value) and press a key and note the number in the console
   */
  if (instructionStage > maxInstruction) {
    switch (value) {
      case 32: //32 = space
        thisBall.changeVelocity(stage7Velocity);
        thisBall.isActive = !thisBall.isActive;
        break;
      case 13:
        //handle enter
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

function stage7MouseClicked() {
  //executed when the mouse is clicked and we're on stage 7
}

function drawImageStage7() {
  drawImage(equationImage, 150, 150);
}

function stage7Resized() {
  //called when the window is resized and we're on stage number
  //allows changing the size of stage-specific objects
  textBox.position(windowWidth / 2 - 150, windowHeight / 2 - 300); //position of lower left corner
}
