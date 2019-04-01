function cookieStorageLoad() {
  if (!DEBUG) {
    var thisCookieStore = document.cookie;
    var noCookies;
    if (thisCookieStore == "") {
      noCookies = true;
    } else {
      noCookies = false;
    }
    thisCookieStore = thisCookieStore.split("; ");
    var result = [];
    for (cookie of thisCookieStore) {
      var cur = cookie.split("=");
      result[cur[0]] = cur[1];
    }

    if (noCookies) {
      //no cookies, set to default
      score = 0;
      highScore = 0;
      var a = new Date(new Date().getTime() + 1000 * 2 * 60 * 60 * 24);
      document.cookie =
        "highestStage=1; expires=" + a.toGMTString() + "; path=/";
      document.cookie =
        "highestScore=0; expires=" + a.toGMTString() + "; path=/";
      document.cookie =
        "currentScore=0; expires=" + a.toGMTString() + "; path=/";
    } else {
      highScore = parseFloat(result["highestScore"]);
      stageNumber = parseInt(result["highestStage"]);
      if (stageNumber > maxStage) {
        stageNumber = maxStage;
      }
      score = parseFloat(result["currentScore"]);
    }
  }
}

function resetCookies() {
  score = 0;
  highScore = 0;
  stageNumber = 1;
  constructorRun = false;
  var a = new Date(new Date().getTime() + 1000 * 2 * 60 * 60 * 24);
  document.cookie = "highestStage=1; expires=" + a.toGMTString() + "; path=/";
  document.cookie = "highestScore=0; expires=" + a.toGMTString() + "; path=/";
  document.cookie = "currentScore=0; expires=" + a.toGMTString() + "; path=/";
  setup();
}
