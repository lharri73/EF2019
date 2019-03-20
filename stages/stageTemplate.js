/*This is simply a template for the stages, these will not actually be run
 *Just copy and paste to whatever stage you're working on and replace every
 *occurance of "Number" with the stage Number you're working on
 */

function stageNumberConstructor() {
  //The constructor for the stage
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
}

function stageNumberMouseClicked() {
  //executed when the mouse is clicked and we're on stage Number
}

function stageNumberResized() {
  //called when the window is resized and we're on stage number
  //allows changing the size of stage-specific objects
}
