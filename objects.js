//these functions will be called to generate the graphic

function drawCannon(xPosition, yPosition, angleCCFromHoriz) {}

class target {
  constructor(positionVector, radius = 38) {
    this.position = positionVector;
    this.radius = radius;
  }
  draw() {
    //TODO: update this to look like a target rather than a circle
    fill(255); //color white
    ellipse(this.position.x, this.position.y, this.radius * 2);
  }
}

class ball {
  constructor(positionVector, veolictyVector, accelerationVector) {
    this.position = positionVector;
    this.velocity = veolictyVector;
    this.acceleration = accelerationVector;

    this.isActive = false;
    this.radius = 10;
  }
  draw() {
    fill(244, 75, 66); //red color for the ball
    stroke(0); //sets the outline color to white
    strokeWeight(1); //this is the default stroke weight
    ellipse(this.position.x, this.position.y, this.radius * 2);
  }
  update() {
    if (this.isActive) {
      //offset because this happens every frame, not every second
      //ever frame is 1/60th of a second
      this.velocity.add(p5.Vector.div(this.acceleration, 60));
      this.position.add(p5.Vector.div(this.velocity, 60));
    }
  }
  changeVelocity(newVelocity) {
    this.velocity = newVelocity;
  }
}

class wall {
  //type = TOP or BOTTOM
  //height = distance from edge of screen
  //position = distance from left side
  constructor(height, position, type, width = 100) {
    this.height = height;
    this.position = position;
    this.type = type;
    this.width = width;
  }
  draw() {
    fill(130, 62, 0);
    if (this.type == TOP) {
      rect(this.position, 0, this.width, this.height);
    } else {
      rect(this.position, windowHeight, this.width, -1 * this.height);
    }
  }
}

class cloud {
  constructor() {}
  draw() {}
}
