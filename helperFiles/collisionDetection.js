function isCollided(ball, thing) {
  //this is SUPER not efficient, but oh well. We can fix it later
  ///..or not, it's whatever
  if (thing instanceof target) {
    var displacementVector = createVector(thing.radius, thing.radius);
    var thingPosition = p5.Vector.add(thing.position, displacementVector);
    var ballPosition = p5.Vector.add(ball.position, displacementVector);
    //edit this because the image is indexed at the top left corner, not the center
    if (ballPosition.dist(thingPosition) < ball.radius + thing.radius) {
      return true;
    } else {
      return false;
    }
  } else if (thing instanceof wall) {
    if (
      thing.x < ballPosition.x - ball.radius &&
      thing.x + thing.width > ballPosition.x + ball.radius
    ) {
      if (thing.type == TOP) {
        if (
          ballPosition.y - ball.radius < thing.height &&
          ballPosition.y - ball.radius > 0
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        if (
          ballPosition.y + ball.radius > windowHeight - thing.height &&
          ballPosition.y + ball.radius < windowHeight
        ) {
          return true;
        } else {
          return false;
        }
      }
    } else {
      return false;
    }
  }
}
