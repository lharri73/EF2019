//these functions will be called to generate the graphic

//TODO replace all of the x and y positions with vectors
function drawCannon(xPosition, yPosition, angleCCFromHoriz) {}

class target {
  constructor(positionVector) {
    this.position = positionVector;
    this.radius = 100;
  }
  draw() {
    //TODO: update this to look like a target rather than a circle
    fill(255); //color white
    ellipse(this.position.x, this.position.y, 50, 100);
  }
}

class ball {
  constructor(positionVector, veolictyVector, accelerationVector) {
    this.position = positionVector;
    this.velocity = veolictyVector;
    this.acceleration = accelerationVector;

    this.isActive = false;
    this.radius = 20;
  }
  draw() {
    fill(244, 75, 66); //red color for the ball
    stroke(0); //sets the outline color to white
    strokeWeight(1); //this is the default stroke weight
    ellipse(this.position.x, this.position.y, this.radius);
  }
  update() {
    if (this.isActive) {
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
    }
  }
}
