/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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
/*let count =0;
let cardList;
let cardTag;
const open = function(e){
    e.target.classList.add('open', 'show');
}
const close = function(e){
    e.target.classList.remove('open', 'show');
}
const deck=document.querySelector('#decks');
deck.addEventListener('click',function(e){
    let first=$(this);
    open(first);

    count++;
    if(count===2)   
    {
        if(cardList===e.target.innerHTML)
        {
            console.log('win win'+count);
            count=0;
        }else {
            //count=0;
            //console.log('lose lose'+count);
            setTimeout(close(e), 1000);
            setTimeout(close(e), 1000);
            
        }    
    }
    cardTag=e.target;
    console.log(cardTag);
    cardList=e.target.innerHTML;
});*/
let card = document.getElementsByClassName("card");
let cards = [...card];
var displayCard = function (){
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
 }
for (var i = 0; i < cards.length; i++){
   cards[i].addEventListener("click", displayCard);
};

 const deck = document.querySelector(".deck");
 window.onload= start();
 function start(){
    let shuffledArray = shuffle(cards);
    const Frag = document.createDocumentFragment();
    for (let i= 0; i < shuffledArray.length; i++){
       [].forEach.call(shuffledArray, function(item){
          Frag.appendChild(item);
       });
    }
    deck.appendChild(Frag);
 }
 function moveCounter(){    
    moves++;    
    counter.innerHTML = moves;
}
 function cardOpen() {
    openedCards.push(this);
    var len = openedCards.length;
    if(len === 2){
        moveCounter();
        if(openedCards[0].type === openedCards[1].type){
            matched();
        } else {
            unmatched();
        }
    }
};
function matched(){
    openedCards[0].classList.add("match");
    openedCards[1].classList.add("match");
    openedCards[0].classList.remove("show", "open");
    openedCards[1].classList.remove("show", "open");
    openedCards = [];
}
function unmatched(){
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disable();
    setTimeout(function(){
        openedCards[0].classList.remove("show", "open", "unmatched");
        openedCards[1].classList.remove("show", "open", "unmatched");
        enable();
        openedCards = [];
    },1100);
}
function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
    });
}
function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for(var i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("disabled");
        }
    });
}