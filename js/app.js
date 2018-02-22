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
/*
* Display the cards on the page
*   - shuffle the list of cards using the provided "shuffle" method below
*   - loop through each card and create its HTML
*   - add each card's HTML to the page
*/

displayGrid();

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
  if(event.target.className === "card animated") {
    displayCard(event.target);
    addToOpenCards(event.target);
    if(selectedCards.length === 2) {
      setTimeout(checkIfCardsMatch, 800);
  }
}

function checkIfCardsMatch() {
  if(cardsMatch()){
    lockCards();
  }
  else {
    shakeCards();
    setTimeout(hideCards, 800);
  }
  increaseMovesCounter();
}
}

function hideCards() {
  document.getElementsByClassName("card")[selectedCards[0]].className = "card animated flipInY";
  document.getElementsByClassName("card")[selectedCards[1]].className = "card animated flipInY";

  selectedCards.pop();
  selectedCards.pop();
}

function shakeCards() {
  document.getElementsByClassName("card")[selectedCards[0]].className = "card animated open show shake";
  document.getElementsByClassName("card")[selectedCards[1]].className = "card animated open show shake";

}

function lockCards() {
  document.getElementsByClassName("card")[selectedCards[0]].className = "card match";
  document.getElementsByClassName("card")[selectedCards[1]].className = "card match";

  selectedCards.pop();
  selectedCards.pop();
}

function cardsMatch() {
  return (selectedCards.length === 2)
  && (document.getElementsByClassName("card")[selectedCards[0]].innerHTML
  === document.getElementsByClassName("card")[selectedCards[1]].innerHTML);
}

function addToOpenCards(element) {
  selectedCards.push(element.id);
}

function displayCard(target) {
  target.className = "card animated open show flipInY";
}

function increaseMovesCounter() {
  moves++;
  document.getElementsByClassName("moves")[0].textContent = moves;
}

function restart() {
  moves = 0;
  document.getElementsByClassName("moves")[0].textContent = moves;
  selectedCards = [];
  displayGrid();
}
