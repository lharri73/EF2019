//these functions will be called to generate the graphic

//TODO replace all of the x and y positions with vectors
function drawCannon(xPosition, yPosition, angleCCFromHoriz) {}

function drawBall(xPosition, yPosition) {
  fill(244, 75, 66); //red color for the ball
  stroke(0); //sets the outline color to white
  strokeWeight(1); //this is the default stroke weight
  ellipse(xPosition, yPosition, 20);
}

function drawTarget(xPosition, yPosition) {
  //TODO: update this to look like a target rather than a circle
  fill(255); //color white
  ellipse(xPosition, yPosition, 50, 100);
}

class ball {
  constructor(positionVector, veolictyVector) {
    this.position = positionVector;
    this.velocity = veolictyVector;
  }
  draw() {
    fill(244, 75, 66); //red color for the ball
    stroke(0); //sets the outline color to white
    strokeWeight(1); //this is the default stroke weight
    ellipse(this.position.x, this.position.y, 20);
  }
  update() {
    this.position.add(this.velocity);
  }
}
