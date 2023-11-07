

const blackjackDeck = getDeck();
console.log(blackjackDeck)

// /**
//  * Represents a card player (including dealer).
//  * @constructor
//  * @param {string} name - The name of the player
//  */
class CardPlayer {
    constructor(name){
        this.name = name
        this.hand = []
    }
    
        drawCard = function (){
            const random_number = Math.floor(Math.random()* 51)
            const carddraw = blackjackDeck[ random_number]
            this.hand.push(carddraw)
            
        }
 
}; //TODO

// // CREATE TWO NEW CardPlayers
// const dealer; // TODO
const dealer =  new CardPlayer('Robin')
// const player; // TODO
const player = new CardPlayer('Jessi')

// /**
//  * Calculates the score of a Blackjack hand
//  * @param {Array} hand - Array of card objects with val, displayVal, suit properties
//  * @returns {Object} blackJackScore
//  * @returns {number} blackJackScore.total
//  * @returns {boolean} blackJackScore.isSoft
//  */
const calcPoints = (hand) => {
//   // CREATE FUNCTION HERE 
         let total_points = 0;
         for (let i = 0; i < hand.length;i++){
          if ((hand[i].val + total_points > 21) ){
            if (hand[i].val === 11 ) { 
             total_points +=  1
             hand[i].val = 1     
            }
            else {
               total_points +=  hand[i].val
            }
          }
        else {
               total_points += hand[i].val
            }

         }
         
            const blackJackScore = {
                total : total_points,
                isSoft: () =>{
                    hand.forEach(element => {
                      if (element.val === 11){
                        return true
                    } 
                    });
                    return false
                    
                }

            }
            return blackJackScore
        }

// }

// /**
//  * Determines whether the dealer should draw another card.
//  * 
//  * @param {Array} dealerHand Array of card objects with val, displayVal, suit properties
//  * @returns {boolean} whether dealer should draw another card
//  */
const dealerShouldDraw = (dealerHand) => {
//   // CREATE FUNCTION HERE
    const dealerHand_total = calcPoints(dealerHand)
    if (dealerHand_total.total === 17 && dealerHand_total.isSoft()){
        return true
    }
    else if (dealerHand_total.total <= 16){
        return true
    }
    return false
}

// /**
//  * Determines the winner if both player and dealer stand
//  * @param {number} playerScore 
//  * @param {number} dealerScore 
//  * @returns {string} Shows the player's score, the dealer's score, and who wins
//  */
const determineWinner = (playerScore, dealerScore) => {
//   // CREATE FUNCTION HERE
    if (playerScore > dealerScore ){
           if (playerScore !== 21){
            return `Player Score ${playerScore} and Dealer Score ${dealerScore}  Player wins`
           }
           else{
            return `Player Score ${playerScore} and Dealer Score ${dealerScore}  Dealer wins`
           }       
    }
    else if ((dealerScore > playerScore )){
      if (dealerScore!== 21){
        return `Player Score ${playerScore} and Dealer Score ${dealerScore}  Dealer wins`
       }
       else{
        return `Player Score ${playerScore} and Dealer Score ${dealerScore}  Player wins`
       }    
    }
    else if (playerScore === dealerScore){
      return `Player Score ${playerScore} and Dealer Score ${dealerScore} There is a tie`
    }



}

// /**
//  * Creates user prompt to ask if they'd like to draw a card
//  * @param {number} count 
//  * @param {string} dealerCard 
//  */
const getMessage = (count, dealerCard) => {
  return `Dealer showing ${dealerCard.displayVal}, your count is ${count}.  Draw card?`
}

// /**
//  * Logs the player's hand to the console
//  * @param {CardPlayer} player 
//  */
const showHand = (player) => {
  const displayHand = player.hand.map((card) => card.displayVal);
  console.log(`${player.name}'s hand is ${displayHand.join(', ')} (${calcPoints(player.hand).total})`);
  const hands = `${player.name}'s hand is ${displayHand.join(', ')} (${calcPoints(player.hand).total})`
  return hands
}

// /**
//  * Runs Blackjack Game
//  */
const startGame = function() {
  player.drawCard();
  dealer.drawCard();
  player.drawCard();
  dealer.drawCard();
  let playerScore = calcPoints(player.hand).total;
  let dealerScoreof2cards = calcPoints(dealer.hand).total;
  if(playerScore > 21){                     // to break if score after drawing 2 cards is more then 1
    return 'Dealer wins'
  }
  else if(dealerScoreof2cards > 21){       // to break if score after drawing 2 cards is more then 1
    return 'Player wins'
  }
  showHand(player);
  while (playerScore < 21 && confirm(getMessage(playerScore, dealer.hand[0]))) {
    player.drawCard();
    playerScore = calcPoints(player.hand).total;
    showHand(player);
  }
  
 document.getElementById("demo").innerHTML = showHand(player)  // display on html player hand cards
 
  if (playerScore > 21) {
    return 'You went over 21 - you lose!';
  }
  console.log(`Player stands at ${playerScore}`);

  let dealerScore = calcPoints(dealer.hand).total;
  while (dealerScore < 21 && dealerShouldDraw(dealer.hand)) {
    dealer.drawCard();
    dealerScore = calcPoints(dealer.hand).total;
    showHand(dealer);
  }
  document.getElementById("demo1").innerHTML = showHand(dealer)  // display on html dealer hand cards
  if (dealerScore > 21) {
    return 'Dealer went over 21 - you win!';
  }
  console.log(`Dealer stands at ${dealerScore}`);
   
  return determineWinner(playerScore, dealerScore);
}
console.log(startGame());