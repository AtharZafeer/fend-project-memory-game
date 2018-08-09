let interval,minute=0,second=0,hour=0;
let cards=[...document.getElementsByClassName("card")];
let deck= document.querySelector(".deck");
const reset= document.querySelector(".restart");
let openCards=[], viewedElements=[];
let moves=0; 
//let container=document.querySelector('.container');
let stars=document.querySelector('.stars');
console.log(stars);
//let timer=document.querySelector('timer');
let model=document.querySelector('#pops');
let closebutton=document.querySelector('.close');
/*global decalrations */
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
/*shuffle func  */


function start(){
    let shuffledArray=shuffle(cards);
    let frag=document.createDocumentFragment();
    for(let i=0;i<shuffledArray.length;i++)
    {
        frag.appendChild(shuffledArray[i]);
    }
    deck.appendChild(frag);
    
    
    
}
window.onload=start();
  /*function that sets the cards, deck, timer */
  const displayCard = function (){
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disable");
    //console.log(this);
    let e=this;
    cardOpen(e);
    
    
}

/*display function*/
function cardOpen(e)
{   
    openCards.push(e);
    let len= openCards.length;
    
    if(len==2){
        openCards[0].classList.toggle('disable');openCards[1].classList.toggle('disable');
        if((openCards[0].id+'1'==openCards[1].id)||(openCards[0].id==openCards[1].id+'1')){
            openCards[0].classList.add('disable');
            openCards[1].classList.add('disable');
            console.log('miss me?');
            viewedElements.push(openCards.splice(0,len));
            win();
            movesMade(); 
        }else{
            openCards[0].classList.add('unmatch');
            openCards[1].classList.add('unmatch');
            deck.classList.add("disable");
            movesMade();
            setTimeout(function(){
                openCards[0].classList.remove('show','open','unmatch');
                openCards[1].classList.remove('show','open','unmatch');
                deck.classList.remove("disable");
                openCards=[];  
            }, 1000);
            
            
        }
    
    }
}

/*card open*/

reset.addEventListener('click',restart);
function restart(){
    setTimeout(function(){
        cards=shuffle(cards);
        deck.innerHTML="";
        let frag=document.createDocumentFragment();
        for(let i=0;i<cards.length;i++)
         {
             
             frag.appendChild(cards[i]);
             cards[i].classList.remove("show", "open","disable"); 
         }
         deck.appendChild(frag);
         openCards=[];
         viewedElements=[];
         moves=0;
         let move=document.querySelector('.moves');
         move.textContent=moves;
         let timer=document.querySelector('.timer');
         timer.textContent="0mins 0secs";
         clearInterval(interval);
         second=0;minute=0;hour=0;
         stars.innerHTML=" ";
         stars.innerHTML='<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
     },300);
     
}
/* reset button */
function startTimer(){
    let timer=document.querySelector(".timer");
    clearInterval(interval);
    timer.innerHTML="0mins 0secs"
    minute=0,second=0;
    interval = setInterval(function(){
    timer.innerHTML = minute+"mins "+second+"secs";
    second++;
        
        if(second == 60){
            minute++;
            second = 0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
        
    },1000);
}
/*timer function*/
function movesMade(){
    moves++;
    let move=document.querySelector('.moves');
    //console.log(move.textContent + moves);
    move.textContent=moves;
    if(moves==1){
     startTimer();   
    }
    if (moves > 8 && moves < 16){
       stars.innerHTML=""; 
       stars.innerHTML='<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
       console.log(stars);
    }
    else if (moves > 16 && moves <=20){
        stars.innerHTML="";
        stars.innerHTML='<li><i class="fa fa-star"></i></li>';
    }else if(moves > 20){
        stars.innerHTML=' ';
    }
}

/*moves counter*/
  for (var i = 0; i < cards.length; i++){
    cards[i].addEventListener("click",displayCard,true);
 }
/*adds eventListener*/
function win(){
    if(viewedElements.length==8)
    {   
        let timer=document.querySelector('.timer');
        clearInterval(interval);
        let finalTime = timer.innerHTML;
        model.classList.add("show");
        let starRating = document.querySelector(".stars").innerHTML;
        document.getElementById("noOfMoves").innerHTML = moves;
        document.getElementById("rating").innerHTML = starRating;
        document.getElementById("time").innerHTML = finalTime;
        //console.log(finalTime + starRating + moves);
        model.style.cssText='visibility:visible; opacity:.7;';
        
        let play=document.querySelector('button');
        play.addEventListener('click',playAgain);

    }
}


function playAgain(){
    model.classList.remove("show");
    model.style.cssText="visibility:hidden; opacity:0;"
    restart();
}