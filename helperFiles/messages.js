function drawMessage(textForMessage, anyKeyBool = false) {
  //textForMessage: the text to draw
  //anyKeyBool: <true|false> whether or not to draw "press any key to continue"
  var border = 10;
  var width = 500;
  var height = 300;
  var positionX = windowWidth / 2 - width / 2;
  var positionY = windowHeight / 2 - height / 2;

  noFill();
  stroke(0);
  strokeWeight(3);
  rect(positionX, positionY, width, height); //draw the rectangle for the instrudtions

  strokeWeight(1); //reset stroke weight to default
  fill(0); //reset fill for text
  textSize(18);
  text(
    textForMessage,
    positionX + border,
    positionY + textAscent() + border,
    width - 2 * border,
    height - 2 * border
  );

  if (anyKeyBool) {
    stroke(255);
    fill(255);
    text(
      "Press any key to continue",
      positionX + 105,
      positionY + height / 2 + 100
    );
  }
}

function drawImage(img, width, height) {
  var border = 10;
  var positionX = windowWidth - width;
  var positionY = windowHeight - height;
  image(img, positionX, positionY, width, height);
}

function incrimentTimer() {
  timeElapsed += 0.01;
}
