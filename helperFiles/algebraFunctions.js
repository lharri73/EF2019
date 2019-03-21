//rounds the input number to the given decimal places
function roundToFixed(number, precision) {
  var m = pow(10, precision);
  return round(number * m) / m;
}

function outOfBounds(object) {
  if (object.position.x > windowWidth || object.position.x < 0) {
    return true;
  }
  if (obkect.position.y > windowHeight || object.position.y < 0) {
    return true;
  }
  return false;
}
