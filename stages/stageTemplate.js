/*This is simply a template for the stages, these will not actually be run
 *Just copy and paste to whatever stage you're working on and replace every
 *occurance of "Number" with the stage Number you're working on
 */

function stageNumberConstructor() {
  //The constructor for the stage
  instructionStage = 2;
  maxInstruction = instructions[stageNumber].length;
}

function drawStageNumber() {
  //the draw function, called every frame

  //determines if the game loop should be run, or if the instructions should be shown
  if (instructionStage >= instructions[stageNumber].length) {
    stageNumberLoopAndCheck();
  }
  //TODO:change to else if ???
  if (instructionStage < maxInstruction) {
    drawMessage(
      instructions[stageNumber][instructionStage],
      instructionStage,
      true
    );
  }
}

//this is the actual game loop, run if there are no instructions to show
function stageNumberLoopAndCheck() {
  drawObjectivesStageNumber();
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
  if (instructionStage <= maxInstruction && instructionStage > 1) {
    //catch any key and run the function if there is more instructions to show
    instructionStage++;
  }
  if (instructionStage == 1) {
    textBox.remove();
    incrimentStage();
  }
  if (instructionStage == 0) {
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
