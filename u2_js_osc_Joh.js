"use strict";
let score = 0;  //  Score will store the player score throughout the game. Player starts with score = zero.
let winnerChest = "";  //  The chest containing the treasure. Given an empty sting before the chest have been created.
let treasurePhoto = "";  //  Will store object containing a picture recived from pexel API.

/**
 * @desc - After the DOM content has loaded, init() is called. When init is called this function starts the game by calling
 * two different function.
*/
function init(){
  initGameUI();
  scoreElement();
}

/**
 * @desc - Call to different functions that creates Elements and Game functions.
*/
function initGameUI(){
  initChests();
  initRefreshButton();
}

/**
 * @desc - Creates three image elements inside the div. This are the chests players going to be opening.
*/
function initChests(){
  let chestWrapperRef = document.getElementById("chests");  //  Store the div wrapping the chests as an referance.
  let chestRef = "";  //  Will be a referance to image elements.
  
  //  For every loop we create an img element and give it attributes. 
  for(let i = 0; i < 3; i++){
    chestRef = document.createElement("img");
    chestRef.setAttribute("style", "margin: 10px;");
    chestRef.setAttribute("src", "../images/chest-closed.png");
    chestWrapperRef.appendChild(chestRef);  //  Make it possible to see the img elements and they will be children to the div.
  }
  // call function with given argument. 
  placeTreassure(chestWrapperRef.children);
}

/**
 * @desc -  Make a request towards pexels API and gets 15 different picture using search word treasure.
*/
function getImageFromPexels(){
  let xhr = new XMLHttpRequest;  //  Store the XMLHttPRequest object in variable xhr.

  // Request data from Pexel Api using the url. Will recive 15 picture from the search result on the word tresure. true is set to make this request asynchronous.
  xhr.open("Get", "https://api.pexels.com/v1/search?query=treasure+query&per_page=15&page=1", true);
  xhr.setRequestHeader("Authorization", "563492ad6f91700001000001a2a58a860a564047aee24d132f474993");  //  Set a request header which will contain my API-key.
  xhr.onload = function (){
    let randomNumber = Math.floor(Math.random() * 15);  //  Give randomNumber a value between 0 - 14.

    if(this.status == 200 && this.readyState == 4){
      let photos = JSON.parse(this.responseText);  //  Parse file that was recived from Pexel to a JavaScript Object, and save it to photos.
      let arrTresurePhotos = photos.photos;   //  Put the array containing 15 photos from object photo, and save it as an referance in variable arrTresurePhotos.
      
      //  Iterate through array arrTresurePhotos. When i is equal to randomNumber we place the photo object with that same indexnumber to treasurePhoto.
      for(let i = 0; i < arrTresurePhotos.length; i++){
        if(i === randomNumber){
          treasurePhoto = arrTresurePhotos[randomNumber];
        }
      }
    }
  }
  xhr.send();  //  Send request to server.
}

/**
 * @desc -  This functions puts a treassure randomly in one of the three chests.
 * @param object chestList - object with a List of what the div contains.
*/
function placeTreassure(chestList){
  let randomNumber = Math.floor(Math.random() * 3);  //  Give randomNumber a value between 0 - 2.
  getImageFromPexels(); // call function that will recive a random picked photo to be used as a treasure. 
  
  //  loop through chestList which is an HTMLCollection and have a syntax similar to arrays. 
  for(let i = 0;i < chestList.length; i++){
    //  If i is equal to RandomNumber give winnerChest the value of the element with the indexnumber of randomNumber.
    if(i === randomNumber){
      winnerChest = chestList[i];
    }
  }
  initChestEventListeners();   //  call function with given parameter winnerChest with treassure.
}

/**
 * @desc - add an eventlistener to the chest. When clicked on the callback function chestClicked is called.
*/
function initChestEventListeners() {
  document.getElementById("chests").addEventListener("click", chestClicked);
}

/**
 * @desc -  Fires when one of the chests are clicked on. Will check if the chest that was clicked contains the treasure. 
 * @param event - @param event - chestClicked has event as parameter. In this case its a mouseclick on the element.
*/
function chestClicked(event){
  //  If the event thats is clicked on is equal to the element containing the treasuer. (event.target is reference to the element that was clicked on).
  if(event.target === winnerChest){
    event.target.setAttribute("src", treasurePhoto.src.tiny);  // receive the sorce url from the object and set it as an attribute to the chest containing the treasure.
    initScoreBoard();  //  Calls initScore to update the score board with 5 new points.  
    removeChestEvents();  //  call function to stop listening to click events on the chests elements.
  }
  //  if the chest dont contains the treasure an img with an open empty chest will be set as an attribute to the clicked chest.
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
  let scoreRef = document.createElement("p");  //  Creates an paragraph and store it in scoreRef as an referance to the element.
  scoreRef.textContent = "Score: " + score;  //  Set text inside the paragraph.
  scoreRef.setAttribute("style", "margin: 10px auto; color: #FFF; font-family: Verdana, Geneva, Tahoma, sans-serif;");  //  Set styling to paragraph.
  document.getElementById("game-wrapper").appendChild(scoreRef);  //  Set the paragraph as a child to the section element and makes it visible.
}

/**
 * @desc - Every time players find the treassure score increasses by 5 and this will set a new text content to secound paragraph on the webpage. 
*/
function initScoreBoard(){
  score += 5;  //  add 5 to score when player finds treassure.
  document.getElementsByTagName("p")[1].textContent = "Score: " + score;  //  New score given to the player through the paragraph. 
}

/**
 * @desc - Adds an eventlistener to the button whit id=refresh-button. When events activates, callback function refresh is called.
*/
function initRefreshButton(){
  let buttonRef = document.getElementById("refresh-button");  //  Get the button by its id and store it ass an reference in buttinRef.
  buttonRef.addEventListener("click", refresh);  //  Adds an eventlistener to the button.
}

/**
 * @desc - Makes it possible to continue the game when player have made a guess (Clicked on chest). This will restore the chests
 * by replacing them whit an empty string using innerHTML, then function initGameUi will be called which will create three new chests and put a new treasure 
 * in one of the three chests.
*/
function refresh(){
  document.getElementById("chests").innerHTML = "";
  initGameUI();
}

//  When DOM content is loaded, function init is called. This is the first thing that's happens when user opens the webpage.
document.addEventListener("DOMContentLoaded", init);