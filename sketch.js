function setup() {
  createCanvas(windowWidth, windowHeight);
  //the stage number is initalized to zero
}

function draw() {
  background(135, 206, 250);
  switch (stageNumber) {
    case 1:
      drawBall(windowWidth / 2, windowHeight / 2);
      break;
    case 2:
      break;
    case 3:
      break;
    /*
        ...
      */
    default:
  }
}

function windowResized() {
  //this handles the resizing of the window
  resizeCanvas(windowWidth, windowHeight);
}
