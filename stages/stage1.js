function stage1Constructor() {
  //this is run once for the stage to generate constant numbers, get random variables, etc.

  initialPosition = createVector(
    floor(random(10, 50)),
    random(0, windowHeight)
  );
  targetPosition = createVector(windowWidth - 50, initialPosition.y);
  isActive = false;
  thisBall = new ball(initialPosition, 0, 0);

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
  drawTarget(targetPosition.x, targetPosition.y);
  thisBall.update();
  thisBall.draw();
}

function stage1keyPressed(value) {
  //value is the value of the key pressed

  //console.log(value)

  if (value == 32) {
    //32 = space
    isActive = !isActive;
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