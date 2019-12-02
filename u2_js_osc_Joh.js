let score = 0;  //  Score will store the player score through out the game. Player starts with score = zero.
let winnerChest = "";  //  The chest containing the treassure. Set too an emty sting before the chest have been created.
let treasurePhoto = "";

/**
 * @desc - After the DOM content has loaded init(); is called. When init is called this function starts the game by calling
 * two different function. One is initGameUI and the second is scoreElement.
*/
function init(){
  initGameUI();
  scoreElement();
}

/**
 * @desc - This function calls to different functions that creates Elements and Game functions.
*/
function initGameUI(){
  initChests();
  initRefreshButton();
}

/**
 * @desc - Creates three images elements inside the div. This are the chests players going to be opening. Will call function placeTreassure.
*/
function initChests(){
  chestWrapperRef = document.getElementById("chests");  //  Store the div wrapping the chests as an referance.
  var chestRef = "";  //  Will be a referance to chests elements.
  
  //  For every loop we create a img element and give it attributes. 
  for( var i = 0; i < 3; i++){
    chestRef = document.createElement("img");
    chestRef.setAttribute("style", "margin: 10px;");
    chestRef.setAttribute("src", "../images/chest-closed.png");
    chestWrapperRef.appendChild(chestRef);  //  Make it possible to see the img elements and they will be children to the div.
  }
  // call function with given parameters of a object of what the divs contains. 
  placeTreassure(chestWrapperRef.children);
}

/**
 * @desc -
 * @param -
 * @return -
*/
// make a request towards pexels API and get 1 Diamond image
function getImageFromPexels(){
  var xhr = new XMLHttpRequest;

  xhr.open("Get", "https://api.pexels.com/v1/search?query=treasure+query&per_page=15&page=1", true);

  xhr.setRequestHeader("Authorization", "563492ad6f91700001000001a2a58a860a564047aee24d132f474993");

  xhr.onload = function (){
    let photos = JSON.parse(this.responseText);
    let randomNumber = Math.floor(Math.random() * 15);  //  Give randomNumber a value between 0 - 14.
    let arrTresurePhotos = photos.photos;

    for(var i = 0; i < arrTresurePhotos.length; i++){
      if(i === randomNumber){
        treasurePhoto = arrTresurePhotos[randomNumber];
      }
    }
  }
  xhr.send();
}

/**
 * @desc -  This functions puts a treassure randomly in one of the three chests. 
 * @param object chestList - object with a List of what the div contains. 
*/
function placeTreassure(chestList){
  let randomNumber = Math.floor(Math.random() * 3);  //  Give randomNumber a value between 0 - 2.
  getImageFromPexels(); // 
  //  loop through chestList which is an HTMLCollection and have a syntax similar to arrays. 
  for(var i = 0;i < chestList.length; i++){
    //  If i is equal to RandomNumber give winnerChest the value of the element with the indexnumber of randomNumber.
    if(i === randomNumber){
      winnerChest = chestList[i];
      console.log(winnerChest); // Use this while development. Remove befor going live. <---------------------------------------------------------
    }
  }
  initChestEventListeners();   //  call function with given parameter winnerChest with treassure.
}

/**
 * @desc - add an eventlistener to the chest. when clicked on the callback function chestClicked is called.
 * @param event - chestClicked has an event as parameter. In this case its a click on the element.
*/
function initChestEventListeners() {
  chestWrapperRef.addEventListener("click", chestClicked);
}

/**
 * @desc -
 * @param event - 
*/
function chestClicked(event){
  //  If the event thats is clicked on is equal to the element containing the treassuer.
  if(event.target === winnerChest){
    event.target.setAttribute("src", treasurePhoto.src.tiny);  //  Give the chest with the treassure a new random images using the API. 
    initScoreBoard();  //  Calls initScore to update the score board with 5 new points.  
    removeChestEvents();  //  call function to stop listening to click events on the chests elements.
  }
  else{
    event.target.setAttribute("src", "../images/chest-open.png");
    removeChestEvents();  //  call function to stop listening to click events on the chests elements.
  }
}

/**
 * @desc - Stops listening on the click event earlier set to the chests. Will be called on when user have clicked on one of the three chests.
*/
function removeChestEvents(){
  document.getElementById("chests").removeEventListener("click", chestClicked);
}

/**
 * @desc - Will create a paragraph with the players score at the start of the game. 
*/
function scoreElement(){
  scoreRef = document.createElement("p");  //  Creates an paragraph and store it in scoreRef as an referance to the element.
  scoreRef.textContent = "Score: " + score;  //  Set text inside the paragraph.
  scoreRef.setAttribute("id", "score")  //  Give the paragraph id=score.
  scoreRef.setAttribute("style", "margin: 10px auto; color: #FFF; font-family: Verdana, Geneva, Tahoma, sans-serif;");  //  Set styling to paragraph.
  document.getElementById("game-wrapper").appendChild(scoreRef);  //  Set the paragraph as a child to the section element and makes it visible.
}

/**
 * @desc - Every time players find the treassure score increasses by 5 and this will set a new text content to secound paragraph on the webpage. 
*/
function initScoreBoard(){
  score += 5;  //  add 5 to score when player finds treassure-
  document.getElementsByTagName("p")[1].textContent = "Score: " + score;  //  New score given to the player through the paragraph. 
}

/**
 * @desc - Adds an eventlistener to the button whit id=refresh-button. When events activates bu a click on the button the function refresh is called.
*/
function initRefreshButton(){
  var buttonRef = document.getElementById("refresh-button");  //  Get the button by its id and store it ass an reference in buttinRef.
  buttonRef.addEventListener("click", refresh);  //  Adds an eventlistener to the button.
}

/**
 * @desc - Makes it possible to continue the game when player have med an guess of which chests cointains the treassuer. This will restore the chests
 * by replacing them whit an empty string and call the function initGameUi thats will create three new chests and put a new treassure in one of the three chests.
*/
function refresh(){
  document.getElementById("chests").innerHTML = "";
  initGameUI();
}

//  When DOM content is loaded, function init is called. This is the first thing that's happens when user opens the webpage.
document.addEventListener("DOMContentLoaded", init);