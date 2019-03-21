/*This is simply a template for the stages, these will not actually be run
 *Just copy and paste to whatever stage you're working on and replace every
 *occurance of "Number" with the stage Number you're working on
 */

function stageNumberConstructor() {
  //The constructor for the stage
  instructionStage = 0;
  maxInstruction = 3;
}

function drawStageNumber() {
  //the draw function, called every frame

  drawObjectivesStageNumber();

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

function drawObjectivesStageNumber() {
  /*this is where the top left corner box is drawn with the Stage's
   *instructions
   */
}

function stageNumberKeyPressed(value) {
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

function stageNumberMouseClicked() {
  //executed when the mouse is clicked and we're on stage Number
}

function stageNumberResized() {
  //called when the window is resized and we're on stage number
  //allows changing the size of stage-specific objects
  textBox.position(windowWidth / 2 - 150, windowHeight / 2 - 300); //position of lower left corner
}
