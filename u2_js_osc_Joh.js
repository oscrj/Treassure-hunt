var score = 0;
var winnerChest = "";
var chestWrapperRef = "";
var scoreRef = "";
/*
* Function that initiates the whole Game application.
*/
function init(){
  initGameUI();
  scoreElement();
}

function initGameUI(){
  // Call functions that creates the Game UI
  initChests();
  initRefreshButton();
}

function initChests(){
  
  chestWrapperRef = document.getElementById("chests");  //  Store the div wrapping the chests as an referance.
  var chestRef = "";  //  Will be a referance to chests elements.
  
  for( var i = 0; i < 3; i++){  //  For every loop we create a img element and give it attributes. 
    chestRef = document.createElement("img");
    chestRef.setAttribute("style", "margin: 10px;");
    chestRef.setAttribute("src", "../images/chest-closed.png");
    chestWrapperRef.appendChild(chestRef);  //  Make it possible to see the img elements and they will be child to the div.
  }
  // call function with given parameters of a list of what the divs contains. 
  placeTreassure(chestWrapperRef.children);
}

function initChestEventListeners() {
  //  add an eventlistener to the chest. when clicked on the chestClicked function is called
  chestWrapperRef.addEventListener("click", chestClicked);
}

function placeTreassure(chestList){

  let randomNumber = Math.floor(Math.random() * 3);  //  give randomNumber a value between 0 - 2.

  for(var i = 0;i < chestList.length; i++){
    if(i === randomNumber){
      winnerChest = chestList[i];
    }
  }

  initChestEventListeners();   //  call function with given parameter winnerChest with treassure.

}

function chestClicked(event){
  
  if(event.target === winnerChest){
    event.target.setAttribute("src", "../images/chest-jewel.png");
    initScoreBoard();
    removeChestEvents();
  }
  else{
    event.target.setAttribute("src", "../images/chest-open.png");
    removeChestEvents();
  }
}

function removeChestEvents(){
  chestWrapperRef.removeEventListener("click", chestClicked);
}

function getImageFromPexels(){
  // make a request towards pexels API and get 1 Diamond image
}

function initRefreshButton(){

  var buttonRef = document.getElementById("refresh-button");
  buttonRef.addEventListener("click", refresh);

}

function scoreElement(){
  scoreRef = document.createElement("p");
  scoreRef.textContent = "Score: " + score;
  scoreRef.setAttribute("id", "score")
  scoreRef.setAttribute("style", "margin: 10px auto; color: #FFF; font-family: Verdana, Geneva, Tahoma, sans-serif;");
  document.getElementById("game-wrapper").appendChild(scoreRef);
}

function initScoreBoard(){
  score += 5;
  scoreRef.textContent = "Score: " + score;
}

function refresh(){
  chestWrapperRef.innerHTML = "";
  initGameUI();
}


  
document.addEventListener("DOMContentLoaded", init);