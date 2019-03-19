//this is used to prevent the game from running a stage that doesn't exist
maxStage = 3;

function windowResized() {
  //this handles the resizing of the window
  resizeCanvas(windowWidth, windowHeight);
  switch (stageNumber) {
    case 1:
      stage1Resized();
      break;
    default:
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  //the stage number is initalized to zero in the html file
  constructorRun = false;
}

function draw() {
  background(135, 206, 250);

  //determine what stage we're on
    switch (stageNumber)
    {
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
      break;
    case 3:
      break;
    /*
        ...
    */
    default:
      //this isn't a valid stage...reset
      stageNumber = 1;
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

function mouseClicked() {
  switch (stageNumber) {
    case 1:
      stage1MouseClicked();
      break;
    case 2:
      stage2MouseClicked();
      break;
  }
}

function keyPressed() {
  switch (stageNumber) {
    case 1:
      stage1keyPressed(keyCode);
      break;
    case 2:
      stage2keyPressed(keyCode);
      break;
  }
}
