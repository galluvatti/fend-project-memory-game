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
let firstCardSelectedIndex = null;
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
  for(index in grid) {
    const li = document.createElement("li");
    li.className = "card";
    li.innerHTML = "<i class=\"fa " + grid[index] +"\"></i>";
    li.addEventListener("click", cardClicked);
    li.id = index
    ul.appendChild(li);
  }
}

//Handles click on a card
function cardClicked(event) {
  if(event.target.className === "card") {
    event.target.className = "card open show";

    if(firstCardSelectedIndex === null) {
      firstCardSelectedIndex = event.target.id;
    }
    else {
      moves++;
      console.log(moves);
      document.getElementsByClassName("moves")[0].textContent = moves;
      const firstCard = document.getElementsByClassName("card")[firstCardSelectedIndex];
      console.log(firstCard);
      if(event.target.innerHTML === firstCard.innerHTML) {
        event.target.className = "card match";
        firstCard.className = "card match";
        firstCardSelectedIndex == null;
      }

      else {
        event.target.className = "card";
        firstCard.className = "card";
      }
      firstCardSelectedIndex = null;
    }
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
