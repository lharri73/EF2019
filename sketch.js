//this is used to prevent the game from running a stage that doesn't exist
maxStage = 3;

function windowResized() {
  //this handles the resizing of the window
  resizeCanvas(windowWidth, windowHeight);
  switch (stageNumber) {
    case 1:
      stage1Resized();
      break;
    case 2:
      stage2Resized();
      break;
    case 3:
      stage3Resized();
    default:
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  /*the stage number is initalized in the html file to keep it in scope
   *throughout the files*/

  //NOTE:
  //When testing a stage, just change the value in the html file
  constructorRun = false;
}

function draw() {
  background(135, 206, 250);
  textSize(18);
  stroke(0);
  fill(0);
  text("Stage: " + stageNumber, windowWidth - 85, textAscent() + 10);

  //determine what stage we're on
  switch (stageNumber) {
    //Making sure that i can edit.
    case 1:
      //run the constructor for stage one if it hasn't been run
      if (!constructorRun) {
        stage1Constructor();
        constructorRun = true;
      }
      //then draw the stage
      drawStage1();
      break;
    case 2:
      if (!constructorRun) {
        stage2Constructor();
        constructorRun = true;
      }
      drawStage2();
      break;
    case 3:
      if (!constructorRun) {
        stage3Constructor();
        constructorRun = true;
      }
      drawStage3();
      break;
    /*
        ...
    */
    default:
      //this isn't a valid stage...reset
      stageNumber = maxStage;
      constructorRun = false;
      break;
  }
}

function incrimentStage() {
  if (stageNumber == maxStage) {
    //you win and have made it through all of the stages!
    //determine if we reset or just keep it at this stage
    return;
  }

  stageNumber++;
  constructorRun = false;
}

function resetStage() {
  constructorRun = false;
}

function mouseClicked() {
  switch (stageNumber) {
    case 1:
      stage1MouseClicked();
      break;
    case 2:
      stage2MouseClicked();
      break;
    case 3:
      stage3MouseClicked();
      break;
  }
}

function keyPressed() {
  switch (stageNumber) {
    case 1:
      stage1KeyPressed(keyCode);
      break;
    case 2:
      stage2KeyPressed(keyCode);
      break;
    case 3:
      stage3KeyPressed(keyCode);
      break;
  }
}
