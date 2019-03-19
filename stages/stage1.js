function stage1Constructor() {
  //this is run once for the stage to generate constant numbers, get random variables, etc.

  initialPosition = createVector(
    floor(random(10, 50)),
    random(0, windowHeight)
  );
  targetPosition = createVector(windowWidth - 50, initialPosition.y);
  isActive = false;
  instructionStage = 0;
  thisBall = new ball(initialPosition, 0, 0);

  maxInstruction = 0;

  //----------------------------------------------------------------------------
  //this creates the textBox in the middle of the screen
  //its contents are returned by calling textBox.value()
  textSize(20); //font size
  textBox = createInput();
  textBox.style("color", "#ffffff"); //text color
  textBox.style("background-color", "#87cefa"); //background color
  textBox.style("border", "2px solid #ffffff"); //border styling
  textBox.position(windowWidth / 2 - 150, windowHeight / 2 - 300); //position of lower left corner
  textBox.size(300, textAscent()); //size of the textbox
}

function drawStage1() {
  //this is where the code for stage one will live
  //once completed, run function incrimentStage()
  drawObjectivesStage1();
  switch (instructionStage) {
    case 0:
      drawStage1Instructions();
      break;
    default:
      drawTarget(targetPosition.x, targetPosition.y);
      thisBall.update();
      thisBall.draw();
      break;
  }
}
//------------------------------------------------------------------------------
//begin objectives
function drawObjectivesStage1() {
  stroke(0);
  strokeWeight(3);
  noFill();
  rect(0, 0, 200, 75);

  strokeWeight(1);
  fill(0);
  textSize(12);
  text(
    "Hit the target with velocity of ###INSERT VELOCITY HERE###",
    10,
    textAscent() + 10
  );
  textSize(20);
}
//------------------------------------------------------------------------------
//Event handlers
function stage1keyPressed(value) {
  //value is the value of the key pressed

  //console.log(value)

  if (value == 32 || instructionStage > maxInstruction) {
    //32 = space
    isActive = !isActive;
  }

  if (instructionStage <= maxInstruction) {
    //catch any key and run the function if there is more instructions to show
    instructionStage++;
  }

  if (isActive) {
    thisBall.velocity = createVector(1, 0);
  } else {
    thisBall.velocity = 0;
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
function drawStage1Instructions() {
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
