function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(135, 206, 250);
    quad(150, 90, 160, 90, 90, 10, 160, 10);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
