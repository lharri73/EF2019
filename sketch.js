//this is used to prevent the game from running a stage that doesn't exist
let clouds = [];

score = 0;
highScore = 0;

maxStage = 7;
instructions = []; //creates a global variable
//backgroundColor = color(135, 206, 250);
let backgroundColor;
let newBackgroundColor;
let amt = 0.01;
function preload() {
  //load font here if not websafe
  importedInstructions = loadStrings("instructions.txt", stringsLoaded);
  menlo = loadFont("assets/Menlo-Regular.ttf");
  /*loadStrings is an async function, however it will be complete
   *because preload includes an await at the end*/
}

function drawBackgroundObjects() {
  //TODO: impliment inclusion of clouds
  for (cloud of clouds) {
    cloud.draw();
  }
}

function stringsLoaded() {
  //this is an async function
  let currentArray = [];
  let currentStage = 1;
  for (i = 0; i < importedInstructions.length; i++) {
    if (importedInstructions[i] == String("//" + currentStage)) {
      instructions.push(currentArray);
      //beginning of new stage's instructions
      currentArray = [];
    } else if (importedInstructions[i].startsWith("//")) {
      currentStage++;
      i--;
      continue;
    } else if (importedInstructions[i].startsWith("##")) {
      //this is a comment
      continue;
    } else {
      currentArray.push(importedInstructions[i]);
    }
  }
}

function windowResized() {
  //this handles the resizing of the window
  resizeCanvas(windowWidth, windowHeight);
  switch (stageNumber) {
    case 1:
      stage1Resized();
      console.log("Resized stage 1");
      break;
    case 2:
      stage2Resized();
      break;
    case 3:
      stage3Resized();
      break;
    case 4:
      stage4Resized();
      break;
    case 5:
      stage5Resized();
      break;
    case 6:
      stage6Resized();
      break;
    case 7:
      stage7Resized();
      break;
  }
}

function setup() {
  backgroundColor = color("#87cefa");
  newBackgroundColor = color("#87cefa");
  createCanvas(windowWidth, windowHeight);
  /*the stage number is initalized in the html file to keep it in scope
   *throughout the files*/
  //NOTE: When testing a stage, just change the value in the html file
  textFont(menlo); //this font is monospace.
  //if we need to change the font, we need to readjust each message's \n
  constructorRun = false;
  backgroundColorChanged = false; //set this to true when the background color is changed
  createTextBox = false;
  for (i = 0; i < 6; i++) {
    clouds.push(new cloud());
  }
  score = 0;
  cookieStorageLoad();
}

function draw() {
  if (backgroundColorChanged) {
    if (backgroundColor.toString() != newBackgroundColor.toString()) {
      fadeColor(backgroundColor, newBackgroundColor, amt);
      return;
    } else {
      backgroundColorChanged = false;
      amt = 0.01;
      createTextBox = true;
    }
  }
  background(backgroundColor);
  drawBackgroundObjects(); //this is where clouds are drawn
  textSize(18);
  stroke(0);
  fill(0);
  text("Stage: " + stageNumber, windowWidth - 90, textAscent() + 10);
  stroke(0);
  strokeWeight(3);
  noFill();
  rect(0, windowHeight, 160, -40);
  strokeWeight(1);
  fill(0);
  textSize(12);
  text("Score     : " + score, 10, windowHeight - textAscent() * 2);
  text("High Score: " + highScore, 10, windowHeight - textAscent() + 5);

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
    case 4:
      if (!constructorRun) {
        stage4Constructor();
        constructorRun = true;
      }
      drawStage4();
      break;
    case 5:
      if (!constructorRun) {
        stage5Constructor();
        constructorRun = true;
      }
      drawStage5();
      break;
    case 6:
      if (!constructorRun) {
        stage6Constructor();
        constructorRun = true;
      }
      drawStage6();
      break;
    case 7:
      if (!constructorRun) {
        stage7Constructor();
        constructorRun = true;
      }
      drawStage7();
      break;
    /*
        ...
    */
    default:
      //this isn't a valid stage...reset to 1
      stageNumber = 1;
      createTextBox = true;
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
  var a = new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 365);
  document.cookie =
    "highestStage=" + stageNumber + "; expires=" + a.toGMTString() + "; path=/";
  constructorRun = false;
  createTextBox = true;
}

function resetStage() {
  constructorRun = false;
  createTextBox = true;
}

function mouseClicked() {
  //TODO: I'm thinking we don't need these...
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
    case 4:
      stage4MouseClicked();
      break;
    case 5:
      stage5MouseClicked();
      break;
    case 6:
      stage6MouseClicked();
      break;
    case 7:
      stage7MouseClicked();
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
    case 4:
      stage4KeyPressed(keyCode);
      break;
    case 5:
      stage5KeyPressed(keyCode);
      break;
    case 6:
      stage6KeyPressed(keyCode);
      break;
    case 7:
      stage7KeyPressed(keyCode);
      break;
  }
}
