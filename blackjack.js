import {getDeck} from './createCardDeck.js'

const blackjackDeck = getDeck();
console.log(blackjackDeck)

// /**
//  * Represents a card player (including dealer).
//  * @constructor
//  * @param {string} name - The name of the player
//  */
class CardPlayer {
    constructor(name,hand){
        this.name = name
        this.hand = hand
    }
     drawCard = function (){
        const carddraw = blackjackDeck[(Math.floor.random()* (hand.length))]
        hand.push(carddraw)
        
    }

}; //TODO

// // CREATE TWO NEW CardPlayers
// const dealer; // TODO
const dealer =  new CardPlayer('Jack',[])
// const player; // TODO
const player = new CardPlayer('Sparrow',[])

// /**
//  * Calculates the score of a Blackjack hand
//  * @param {Array} hand - Array of card objects with val, displayVal, suit properties
//  * @returns {Object} blackJackScore
//  * @returns {number} blackJackScore.total
//  * @returns {boolean} blackJackScore.isSoft
//  */
const calcPoints = (hand) => {
//   // CREATE FUNCTION HERE  
            const total_points =  hand[0].val + hand[1].val
            const found = hand.find((obj) => obj.val === 11)
            const blackJackScore = {
                total : total_points,
                isSoft: () =>{
                    if (found.val === 11){
                        return true
                    }
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
// const determineWinner = (playerScore, dealerScore) => {
//   // CREATE FUNCTION HERE

// }

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
  showHand(player);
  while (playerScore < 21 && confirm(getMessage(playerScore, dealer.hand[0]))) {
    player.drawCard();
    playerScore = calcPoints(player.hand).total;
    showHand(player);
  }
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
  if (dealerScore > 21) {
    return 'Dealer went over 21 - you win!';
  }
  console.log(`Dealer stands at ${dealerScore}`);

  return determineWinner(playerScore, dealerScore);
}
console.log(startGame());