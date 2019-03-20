function stage3Constructor() {
  //The constructor for the stage
}

function drawStage3() {
  //the draw function, called every frame

  drawObjectivesStage3();

  switch (instructionStage) {
    case -1:
      //failure instruction
      break;
    case 0:
      //success instruction
      break;
    case 1:
      //first instruction shown to user when entering this stage
      break;
    /*
      ...
      */
    default:
      break;
  }
}

function drawObjectivesStage3() {
  /*this is where the top left corner box is drawn with the Stage's
   *instructions
   */
}

function stage3KeyPressed(value) {
  /*this is called when a key is pressed and it is on this stage
   *value has the value of the key pressed,
   * we can figure out which number each key is by calling
   *console.log(value) and press a key and note the number in the console
   */
}

function stage3MouseClicked() {
  //executed when the mouse is clicked and we're on stage 3
}

function stage3Resized() {
  //called when the window is resized and we're on stage number
  //allows changing the size of stage-specific objects
}
