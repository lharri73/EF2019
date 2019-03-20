function isCollided(ball, target) {
  //this is SUPER not efficient, but oh well. We can fix it later
  ///..or not, it's whatever

  //TODO: This is not working because the time is off in stage 2...
  //we either need to do special collision detection for stage 2, or rework this
  if (ball.position.dist(target.position) < ball.radius + target.radius) {
    return true;
  } else {
    return false;
  }
}
