//these functions will be called to generate the graphic

function drawCannon(xPosition, yPosition, angleCCFromHoriz) {}

class target {
  constructor(positionVector, radius = 38) {
    this.position = positionVector;
    this.radius = radius;
    this.picture = loadImage("images/core/target-1.png");
  }
  draw() {
    //TODO: update this to look like a target rather than a circle
    fill(255); //color white
    image(
      this.picture,
      this.position.x - this.radius,
      this.position.y - this.radius,
      this.radius * 4, //IDK why this is twice what think it should be
      this.radius * 2
    );
    //ellipse(this.position.x, this.position.y, this.radius * 2);
  }
}

class ball {
  constructor(positionVector, veolictyVector, accelerationVector) {
    this.position = positionVector;
    this.velocity = veolictyVector;
    this.acceleration = accelerationVector;
    this.image = loadImage("images/core/ball.png");
    this.isActive = false;
    this.radius = 10;
    this.trail = [];
  }
  draw() {
    //TODO: make this draw dots along its path so we can see how the velocity changes
    fill(244, 75, 66); //red color for the ball
    stroke(0); //sets the outline color to white
    strokeWeight(1); //this is the default stroke weight
    image(
      this.image,
      this.position.x,
      this.position.y,
      this.radius * 4, //IDK why this is twice what I think it should be
      this.radius * 2
    ); //TODO: not sure if I like the image she drew
    for (let dot of this.trail) {
      dot.draw();
    }
  }
  update() {
    if (this.isActive) {
      //offset because this happens every frame, not every second
      //ever frame is 1/60th of a second
      let currentTrail = new Dot(this.position.x, this.position.y);
      this.trail.push(currentTrail);
      this.velocity.add(p5.Vector.div(this.acceleration, 60));
      this.position.add(p5.Vector.div(this.velocity, 60));
    }
  }
  changeVelocity(newVelocity) {
    this.velocity = newVelocity;
  }
}

class Dot {
  constructor(xPos, yPos) {
    this.position = createVector(xPos, yPos);
  }
  draw() {
    fill(18, 186, 0);
    stroke(18, 186, 0);
    ellipse(this.position.x, this.position.y, 2);
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
  constructor(cloudVelocity = 1) {
    this.position = createVector(random(-100, windowWidth), random(0, 100));
    var cloudType = floor(random(4));
    switch (cloudType) {
      case 0:
        this.image = loadImage("images/core/cloud1.png");
        break;
      case 1:
        this.image = loadImage("images/core/cloud2.png");
        break;
      case 2:
        this.image = loadImage("images/core/cloud3.png");
        break;
      case 3:
        this.image = loadImage("images/core/cloud4.png");
        break;
    }
    this.velocity = cloudVelocity;
  }
  draw() {
    fill(255);
    stroke(255);
    image(this.image, this.position.x, this.position.y, 100, 50);
    this.position.x += this.velocity;
    if (this.position.x > windowWidth) {
      //this makes the clouds look more random without editing an array
      this.position.x = random(-100, 0);
      this.position.y = random(0, 100);
    }
  }
}

class marsCloud {
  constructor(cloudVelocity = -1) {
    this.position = createVector(random(-100, windowWidth), random(0, 100));
    this.UFO = false;
    var cloudType = floor(random(3));
    switch (cloudType) {
      case 0:
        this.image = loadImage("images/mars/redcloud1.png");
        break;
      case 1:
        this.image = loadImage("images/mars/redcloud2.png");
        break;
      case 2:
        this.image = loadImage("images/mars/UFO.png");
        this.UFO = true;
        break;
    }
    this.velocity = cloudVelocity;
  }
  draw() {
    fill(255);
    stroke(255);
    image(this.image, this.position.x, this.position.y, 100, 50);
    if (this.UFO) {
      this.position.x += random(0, -5);
      this.position.y += random(-2, 2);
    } else {
      this.position.x += this.velocity;
    }
    if (this.position.x < 0) {
      //this makes the clouds look more random without editing an array
      this.position.x = random(windowWidth, windowWidth + 100);
      this.position.y = random(0, 100);
    }
  }
}
