function isCollided(ball, thing) {
  //this is SUPER not efficient, but oh well. We can fix it later
  ///..or not, it's whatever
  if (thing instanceof target) {
    if (ball.position.dist(thing.position) < ball.radius + thing.radius) {
      return true;
    } else {
      return false;
    }
  } else if (thing instanceof wall) {
    if (
      thing.x < ball.position.x - ball.radius &&
      thing.x + thing.width > ball.position.x + ball.radius
    ) {
      if (thing.type == TOP) {
        if (
          ball.position.y - ball.radius < thing.height &&
          ball.position.y - ball.radius > 0
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        if (
          ball.position.y + ball.radius > windowHeight - thing.height &&
          ball.position.y + ball.radius < windowHeight
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
