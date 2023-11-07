/**
 * Returns an array of 52 Cards
 * @returns {Array} deck - a deck of cards
 */
const getDeck = () => {
  const deck = []
  face_cards = ['Jack','Queen', 'King']
  suits = ['spade','diamond','heart','club']
  Ace = 11
  suits.forEach(suit_type => {
    for (let i = 1; i <= 13; i++ ){
      let val_num = 0
      let display_Val = ''
      if (i == 1){
            val_num = 11
            display_Val = 'Ace'
      }
      else if (i <= 10){
        val_num = i
        display_Val = val_num.toString()
      }
      else if (i > 10){
        val_num = 10
        if ( i == 11)  display_Val = face_cards[0]
        else if (i == 12) display_Val = face_cards[1]
        else if (i == 13) display_Val = face_cards[2]
      }

      const card = {
        val: val_num ,
        displayVal: display_Val,
        suit: suit_type,
      }
      deck.push(card)

    }
    
  });
  console.log(deck)
  return deck
  
}

// CHECKS
const deck = getDeck()
console.log(`Deck length equals 52? ${deck.length === 52}`)

const randomCard = deck[Math.floor(Math.random() * 52)]

const cardHasVal =
  randomCard && randomCard.val && typeof randomCard.val === 'number'
console.log(`Random card has val? ${cardHasVal}`)

const cardHasSuit =
  randomCard && randomCard.suit && typeof randomCard.suit === 'string'
console.log(`Random card has suit? ${cardHasSuit}`)

const cardHasDisplayVal =
  randomCard &&
  randomCard.displayVal &&
  typeof randomCard.displayVal === 'string'
console.log(`Random card has display value? ${cardHasDisplayVal}`)
