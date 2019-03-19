function isCollided(ball, target) {
  if (ball.position.dist(target.position) < ball.radius + target.radius) {
    return true;
  } else {
    return false;
  }
}
