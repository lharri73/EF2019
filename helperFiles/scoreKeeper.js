function changeScore(difference){
  score += difference;
  var a = new Date(new Date().getTime() +1000*60*60*24*365);
  document.cookie="currentScore="+score+"; expires="+a.toGMTString() + "; path=/";
  if(score >= highScore){
    highScore = score;
    document.cookie="highestScore="+highScore+"; expires="+a.toGMTString() + "; path=/";
  }
}
