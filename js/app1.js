let interval,minute=0,second=0,hour=0;
let cards=[...document.getElementsByClassName("card")];
let deck= document.querySelector(".deck");
const reset= document.querySelector(".restart");
var openCards=[], viewedElements=[];
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

    let timer=document.querySelector(".timer");
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
window.onload=start();
  /*function that sets the cards, deck, timer */
  const displayCard = function (){
    this.classList.toggle("open");
    this.classList.toggle("show");
    //this.classList.toggle("disable");
    let e=this;
    cardOpen(e);
    
    
}

/*display function*/
function cardOpen(e)
{   
    openCards.push(e);
    let len= openCards.length;
    function removeElements(e,s){
        openCards[0].classList.remove('show','open','unmatch');
        openCards[1].classList.remove('show','open','unmatch');
     
        
    }
    if(len==2){
        if((openCards[0].id+'1'==openCards[1].id)||(openCards[0].id==openCards[1].id+'1')){
            openCards[0].classList.add('disable');
            openCards[1].classList.add('disable');
            console.log('miss me?');
            viewedElements.push(openCards.splice(0,len));
            
        }else{
            openCards[0].classList.add('unmatch');
            openCards[1].classList.add('unmatch');
            deck.classList.add("disable");
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

reset.addEventListener('click',function(){
   cards=shuffle(cards);
   deck.innerHTML="";
   let frag=document.createDocumentFragment();
   for(let i=0;i<cards.length;i++)
    {
        
        frag.appendChild(cards[i]);
        cards[i].classList.remove("show", "open"); 
    }
    deck.appendChild(frag);
    let timer=document.querySelector(".timer");
    clearInterval(interval);
    timer.innerHTML="0mins 0secs"
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

});
/* reset button */



  for (var i = 0; i < cards.length; i++){
    cards[i].addEventListener("click",displayCard,true);
 }