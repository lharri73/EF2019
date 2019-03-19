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
  maxInstruction = 3;

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
  switch (instructionStage) {
    case 0:
      drawStage1Instructions();
      break;
    case 1:
      break;
    default:
      drawTarget(targetPosition.x, targetPosition.y);
      thisBall.update();
      thisBall.draw();
      break;
  }
}

function stage1keyPressed(value) {
  //value is the value of the key pressed

  //console.log(value)

  if (value == 32 || instructionStage > maxInstruction) {
    //32 = space
    isActive = !isActive;
  }
  if (instructionStage <= maxInstruction) {
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

function drawStage1Instructions() {
  noFill();
  stroke(0);
  strokeWeight(3);
  var border = 10;
  var width = 500;
  var height = 300;
  var positionX = windowWidth / 2 - width / 2;
  var positionY = windowHeight / 2 - height / 2;
  rect(positionX, positionY, width, height);
  strokeWeight(1); //reset stroke weight to default
  fill(0); //reset fill for text
  text(
    "Hello, this is test Text",
    positionX + border,
    positionY + textAscent() + border
  );
}

function stage1Resized() {
  textBox.position(windowWidth / 2 - 150, windowHeight / 2 - 300); //position of lower left corner
}
