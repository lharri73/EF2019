function stage1Constructor() {
  //this is run once for the stage to generate constant numbers, get random variables, etc.
  maxInstruction = 1; //how many instruction pages there are

  initialPosition = createVector(
    floor(random(10, 50)),
    random(0, windowHeight)
  );

  targetPosition = createVector(windowWidth - 50, initialPosition.y);
  instructionStage = 0;

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
  velocityGoal = floor(random(1, 20));
}

function drawStage1() {
  //this is where the code for stage one will live
  //once completed, run function incrimentStage()
  drawObjectivesStage1();
  switch (instructionStage) {
    case 0:
      drawStage1InstructionsA();
      break;
    case 1:
      drawStage1InstructionsB();
      break;
    default:
      thisTarget.draw();
      thisBall.update();
      thisBall.draw();
      if (isCollided(thisBall, thisTarget)) {
        incrimentStage();
      }
      break;
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
function stage1keyPressed(value) {
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

  if (instructionStage <= maxInstruction) {
    //catch any key and run the function if there is more instructions to show
    instructionStage++;
  }
}

function stage1MouseClicked() {
  //executed when on stage one and the mouse is clicked
}

function stage1Resized() {
  //this function allows for the objects to be resized approprialtely
  textBox.position(windowWidth / 2 - 150, windowHeight / 2 - 300); //position of lower left corner
}

//------------------------------------------------------------------------------
//begin instructions
function drawStage1InstructionsA() {
  var border = 10;
  var width = 500;
  var height = 300;
  var positionX = windowWidth / 2 - width / 2;
  var positionY = windowHeight / 2 - height / 2;

  noFill();
  stroke(0);
  strokeWeight(3);
  rect(positionX, positionY, width, height); //draw the rectangle for the instrudtions

  strokeWeight(1); //reset stroke weight to default
  fill(0); //reset fill for text
  text(
    "There are 2 objects here, one is a ball (which you will \ncontrol), and another, a target. The goal is to hit the \ntarget with the ball. You will be allowed to change a \nvariety of the ball's properties as the game continues.\n\n\nYour objective and cosntraints are in the top left corner",
    positionX + border,
    positionY + textAscent() + border
  );

  stroke(255);
  fill(255);
  text(
    "Press any key to continue",
    positionX + 125,
    positionY + height / 2 + 100
  );
}

function drawStage1InstructionsB() {
  var border = 10;
  var width = 500;
  var height = 300;
  var positionX = windowWidth / 2 - width / 2;
  var positionY = windowHeight / 2 - height / 2;

  noFill();
  stroke(0);
  strokeWeight(3);
  rect(positionX, positionY, width, height); //draw the rectangle for the instrudtions

  strokeWeight(1); //reset stroke weight to default
  fill(0); //reset fill for text
  text(
    "For this stage, you must hit the target with the velocity \nspecified in the top left. Use the text box to set the \ninitial velocity in the x direction, then press enter.",
    positionX + border,
    positionY + textAscent() + border
  );

  stroke(255);
  fill(255);
  text(
    "Press any key to continue",
    positionX + 125,
    positionY + height / 2 + 100
  );
}
