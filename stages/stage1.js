function stage1Constructor() {
  //this is run once for the stage to generate constant numbers, get random variables, etc.
  maxInstruction = instructions[stageNumber].length; //how many instruction pages there are

  initialPosition = createVector(
    floor(random(10, 50)),
    random(80, windowHeight - 80)
  );

  targetPosition = createVector(windowWidth - 50, initialPosition.y);
  instructionStage = 2;

  thisBall = new ball(initialPosition, createVector(0, 0), createVector(0, 0));
  thisTarget = new target(targetPosition);

  //----------------------------------------------------------------------------
  //this creates the textBox in the middle of the screen
  //its contents are returned from the textBox.value() function
  textSize(20); //font size
  textBox = createInput();
  textBox.style("color", "#ffffff"); //text color
  textBox.style("background-color", "#87cefa"); //background color
  textBox.style("border", "2px solid #ffffff"); //border styling
  textBox.position(windowWidth / 2 - 150, windowHeight / 2 - 300); //position of lower left corner
  textBox.size(300, textAscent()); //size of the textbox

  //----------------------------------------------------------------------------
  //initialize game values
  velocityGoal = floor(random(500, 1000));
}

function drawStage1() {
  //this is where the code for stage one will live
  //once completed, run function incrimentStage()
  if (instructionStage >= instructions[stageNumber].length) {
    stage1LoopAndCheck();
  }

  if (instructionStage < maxInstruction) {
    drawMessage(instructions[stageNumber][instructionStage], true);
  }
}

function stage1LoopAndCheck() {
  drawObjectivesStage1();
  thisTarget.draw();
  thisBall.update();
  thisBall.draw();
  if (
    isCollided(thisBall, thisTarget) &&
    thisBall.velocity.mag() == velocityGoal
  ) {
    //if they are colided and the magnitude of the velocity is the velocity required:
    instructionStage = 1;
  } else if (isCollided(thisBall, thisTarget)) {
    instructionStage = 0; //this shal be the failure state
  }
}
//------------------------------------------------------------------------------
//objectives
function drawObjectivesStage1() {
  stroke(0);
  strokeWeight(3);
  noFill();
  rect(0, 0, 200, 75);

  strokeWeight(1);
  fill(0);
  textSize(12);
  text("Final Velocity: " + velocityGoal + "m/s", 10, textAscent() + 10);
  textSize(20);
}
//------------------------------------------------------------------------------
//Event handlers
function stage1KeyPressed(value) {
  //value is the value of the key pressed

  //console.log(value);

  if (instructionStage > maxInstruction) {
    switch (value) {
      case 32: //32 = space
        thisBall.isActive = !thisBall.isActive;
        break;
      case 13: //13 = Enter
        enteredVelocity = parseInt(textBox.value());
        textBox.attribute("hidden", true);
        thisBall.velocity = createVector(enteredVelocity, 0);
        thisBall.isActive = true;
        break;
      default:
    }
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

function stage1MouseClicked() {
  //executed when on stage one and the mouse is clicked
}

function stage1Resized() {
  //this function allows for the objects to be resized approprialtely
  textBox.position(windowWidth / 2 - 150, windowHeight / 2 - 300); //position of lower left corner
}
