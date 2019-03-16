function stage1Constructor() {
  //this is run once for the stage to generate constant numbers, get random variables, etc.

  initialPosition = createVector(
    floor(random(10, 50)),
    random(0, windowHeight)
  );
  targetPosition = createVector(windowWidth - 50, initialPosition.y);
  isActive = false;
}

function drawStage1() {
  //this is where the code for stage one will live
  //once completed, run function incrimentStage()
  drawTarget(targetPosition.x, targetPosition.y);
  drawBall(initialPosition.x, initialPosition.y);
  if (isActive) {
    initialPosition.add(1, 0);
  }
}
