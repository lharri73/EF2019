function stage4Constructor() {
  //The constructor for the stage
  instructionStage = 1;
  maxInstruction = 3;
}

function drawStage4() {
  //the draw function, called every frame

  drawObjectivesStage4();

  switch (instructionStage) {
    case -1:
      //failure instruction
      break;
    case 0:
      //success instruction
      break;
    case 1:
      drawMessage(
        "In stage 4 we begin to experience gravity \nas it is on earth: In the -y direction. ",
        true
      );
      break;
    case 2:
      //TODO: finish this instruction
      drawMessage(
        "In this stage, you will be at a location \nhigher than the target. You will have to enter a ve"
      );
      break;
    /*
      ...
      */
    default:
      break;
  }
}

function drawObjectivesStage4() {
  /*this is where the top left corner box is drawn with the Stage's
   *instructions
   */
}

function stage4KeyPressed(value) {
  /*this is called when a key is pressed and it is on this stage
   *value has the value of the key pressed,
   * we can figure out which number each key is by calling
   *console.log(value) and press a key and note the number in the console
   */
  if (instructionStage > maxInstruction) {
    switch (value) {
      case 32: //32 = space
        thisBall.isActive = !thisBall.isActive;
        break;
      case 13:
        //handle enter
        break;
      default:
    }
    return;
  }
  if (instructionStage <= maxInstruction && instructionStage > 0) {
    //catch any key and run the function if there is more instructions to show
    instructionStage++;
  }
  if (instructionStage == 0) {
    textBox.remove();
    incrimentStage();
  }
  if (instructionStage == -1) {
    textBox.remove();
    resetStage();
  }
}

function stage4MouseClicked() {
  //executed when the mouse is clicked and we're on stage 4
}

function stage4Resized() {
  //called when the window is resized and we're on stage number
  //allows changing the size of stage-specific objects
  textBox.position(windowWidth / 2 - 150, windowHeight / 2 - 300); //position of lower left corner
}
