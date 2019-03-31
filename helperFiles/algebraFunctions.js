//rounds the input number to the given decimal places
function roundToFixed(number, precision) {
  return parseFloat(Math.round(number * 100) / 100).toFixed(2);
}

function outOfBounds(object) {
  if (object.position.x > windowWidth || object.position.x < 0) {
    return true;
  }
  //for stage 7, it's possible to go ABOVE the screen, there simply isn't enough room on the canvas
  if (
    object.position.y > windowHeight ||
    (stageNumber != 7 && object.position.y < 0)
  ) {
    return true;
  }
  return false;
}

function addHexColor(c1, c2) {
  c1 = removeHash(c1);
  c2 = removeHash(c2);
  var hexStr = (parseInt(c1, 16) + parseInt(c2, 16)).toString(16);
  while (hexStr.length < 6) {
    hexStr = "0" + hexStr;
  } // Zero pad.
  hexStr = "#" + hexStr;
  return hexStr;
}

function removeHash(s) {
  while (s.charAt(0) === "#") {
    s = s.substr(1);
  }
  return s;
}

function fadeColor(c1, c2) {
  backgroundColor = lerpColor(
    color(backgroundColor),
    color(newBackgroundColor),
    amt
  );
  amt += 0.01;
  if (amt >= 1) {
    amt = 0.01;
    backgroundColor = newBackgroundColor;
  }
  background(backgroundColor);
}
