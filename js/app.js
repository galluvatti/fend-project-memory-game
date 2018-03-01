/*
* Create a list that holds all of your cards
*/
const cards = ["fa-diamond", "fa-diamond",
"fa-paper-plane-o", "fa-paper-plane-o",
"fa-anchor", "fa-anchor",
"fa-bolt", "fa-bolt",
"fa-cube", "fa-cube",
"fa-leaf", "fa-leaf",
"fa-bicycle", "fa-bicycle",
"fa-bomb", "fa-bomb"];
let moves = 0;
let selectedCards = [];
let stars = 3;

let timer = new Timer();
timer.start();
timer.addEventListener('secondsUpdated', function (e) {
  document.querySelector("#timer").innerHTML = timer.getTimeValues().toString();
});
/*
* Display the cards on the page
*   - shuffle the list of cards using the provided "shuffle" method below
*   - loop through each card and create its HTML
*   - add each card's HTML to the page
*/

displayGrid();

//Displays the cards grid
function displayGrid() {
  const grid = shuffle(cards);
  const ul = document.getElementsByClassName("deck")[0];
  ul.innerHTML = "";
  for(index in grid) {
    const li = document.createElement("li");
    li.className = "card animated";
    li.innerHTML = "<i class=\"fa " + grid[index] +"\"></i>";
    li.addEventListener("click", cardClicked);
    li.id = index
    ul.appendChild(li);
  }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

document.getElementsByClassName("restart")[0].addEventListener("click", restart);

/*
* set up the event listener for a card. If a card is clicked:
*  - display the card's symbol (put this functionality in another function that you call from this one)
*  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
*  - if the list already has another card, check to see if the two cards match
*    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
*    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
*    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
*    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
*/

//Handles click on a card
function cardClicked(event) {
  if(event.target.className !== "card animated" || selectedCards.length === 2) {
    return;
  }

  displayCard(event.target);
  addToOpenCards(event.target);
  if(selectedCards.length === 2) {
    setTimeout(checkIfCardsMatch, 800);
  }

}

//Check id the player has matched all the cards and the game is completed
function checkMatchCompleted() {
  if(document.getElementsByClassName("animated").length === 0) {
    console.log("match completed");
    const container = document.getElementsByClassName("container")[0];
    container.innerHTML = "<header><h1><b>Congratulations! You Won!</b></h1></header>"+
    "<p>Completed in " + timer.getTimeValues().minutes +" minutes and " +timer.getTimeValues().seconds
    + " seconds with "+ moves +" Moves and " + stars + " Stars!</p>";
    const button = document.createElement("input");
    button.type = "button";
    button.value = "Play again";
    button.className = "btn-play";
    button.onclick = function () {location.reload()};
    container.appendChild(button);
  }
}

/*
*Check if two cards match: if yes locks the cards open,
*otherwise flip them closed
*/
function checkIfCardsMatch() {
  if(cardsMatch()){
    lockCards();
  }
  else {
    shakeCards();
    setTimeout(hideCards, 800);
  }
  increaseMovesCounter();
  updateStars();
  checkMatchCompleted();
}

//Updates star rating
function updateStars() {
  const starsElement = document.querySelector(".stars").querySelectorAll("i");
  if( moves >= 10) {
    starsElement[1].className = "fa fa-star-o";
    starsElement[2].className = "fa fa-star-o";
    stars = 1;
  }
  else if(moves >= 5) {
    starsElement[2].className = "fa fa-star-o";
    stars = 2;
  }
}

//Hide selected cards when they don't match
function hideCards() {
  document.getElementsByClassName("card")[selectedCards[0]].className = "card animated flipInY";
  document.getElementsByClassName("card")[selectedCards[1]].className = "card animated flipInY";

  setTimeout(resetCards, 800);
}

//restores card default styles
function resetCards() {
  document.getElementsByClassName("card")[selectedCards[0]].className = "card animated";
  document.getElementsByClassName("card")[selectedCards[1]].className = "card animated";
  selectedCards = [];
}

//apply shake animation to cards
function shakeCards() {
  document.getElementsByClassName("card")[selectedCards[0]].className = "card animated open show shake";
  document.getElementsByClassName("card")[selectedCards[1]].className = "card animated open show shake";

}

//Locks card in open position
function lockCards() {
  document.getElementsByClassName("card")[selectedCards[0]].className = "card match";
  document.getElementsByClassName("card")[selectedCards[1]].className = "card match";

  selectedCards = [];
}

//return true if selected cards match
function cardsMatch() {
  return (selectedCards.length === 2)
  && (document.getElementsByClassName("card")[selectedCards[0]].innerHTML
  === document.getElementsByClassName("card")[selectedCards[1]].innerHTML);
}

//Add current card to list of selected cards
function addToOpenCards(element) {
  selectedCards.push(element.id);
}

//Flip a card in open position
function displayCard(target) {
  target.className = "card animated open show flipInY";
}

//Increase the moves counter
function increaseMovesCounter() {
  moves++;
  document.getElementsByClassName("moves")[0].textContent = moves;
}

//Restart the game
function restart() {
  moves = 0;
  document.getElementsByClassName("moves")[0].textContent = moves;
  selectedCards = [];
  displayGrid();
  timer = new Timer();
  timer.start();
}
