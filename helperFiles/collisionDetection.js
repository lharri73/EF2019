function isCollided(ball, target) {
  //this is SUPER not efficient, but oh well. We can fix it later
  ///..or not, it's whatever
  if (ball.position.dist(target.position) < ball.radius + target.radius) {
    return true;
  } else {
    return false;
  }
}
