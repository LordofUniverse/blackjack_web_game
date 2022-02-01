// Value of each cards except ACE, which has two values
const cards_value = {
    '2' : 2,
    '3' : 3,
    '4' : 4,
    '5' : 5,
    '6' : 6,
    '7' : 7,
    '8' : 8,
    '9' : 9,
    '10' : 10,
    'J' : 10,
    'Q' : 10,
    'K' : 10,
}

const cards_list = [
    'A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'
]

// Current cards player or dealer is having. Dealer is computer 
let player_cards = []
let dealer_cards = []

// value of sum of cards
let player_total = 0
let dealer_total = 0

// check if player got blackjack but only once at start of game
const player_check_blackjack = (cards) => {

    if (cards.includes('j') && cards.includes('10')){

        return true

    } 

    return false

}


//finds if u r busted or else gives total value
const calculate = (cards) => {

    let value = 0
    let no_of_A = 0
    
    for (let i = 0; i < cards.length; i++) {
        
        let card = cards[i]
        
        if (card == 'A'){
            no_of_A += 1
        } else {
            value += cards_value[card]
        }
    }


    if (value > 21){
        return 'busted'
    } else if (no_of_A > 0){
        if (value + no_of_A*11 > 21){
            if (value + no_of_A > 21){
                return 'busted'
            } else {
                return (value + no_of_A).toString()
            }
        } else {
            return  (value + no_of_A*11).toString()
        }
    }


    return value.toString()

}


// drawing the cards at start of the game
const init_cards = () => {
    for (let i = 0; i < 2; i++) {
        let card = cards_list[Math.floor(Math.random() * 13)]
        player_cards.push(card)
    }

    // display cards

    if (player_check_blackjack(player_cards)){
        // Player won, blackjack!
        console.log('BLACKJACK')
        restart()
    } 

    player_total = calculate(player_cards)

    for (let i = 0; i < 2; i++) {
        let card = cards_list[Math.floor(Math.random() * 13)]
        dealer_cards.push(card)
    }  

    // display first card alone

    dealer_total = calculate(dealer_cards)

    if (dealer_total == 'busted'){
        // ui stuff
        console.log('dealer busted')
        restart()
    } else if (player_total == 'busted'){
        // ui stuff
        console.log('player busted')
        restart()
    } else {
        // hit(ask for a card) or stay(he doesnt want to draw a card anymre)
        console.log('ask or stay')
    }

}

//player can draw a card as many times as he wants. after stay, dealer has to show his second card
const player_draw_card = () => {
    let card = cards_list[Math.floor(Math.random() * 14)]
    player_cards.push(card)

    console.log(player_cards)

    player_total = calculate(player_cards)

    if (player_total == 'busted'){
        // dealer won
        document.getElementById("cell-22").innerHTML = parseInt(document.getElementById("cell-22").innerHTML) + 1
        console.log('busted')
        restart()
    }
}

// dealer as to draw a new card untill his total is >= 17
const dealer_draw_card = () => {

    while (dealer_total < 17){
        
        let card = cards_list[Math.floor(Math.random() * 14)]
        dealer_cards.push(card)

        console.log(dealer_cards)
        
        dealer_total = calculate(dealer_cards)
        
        if (dealer_total == 'busted'){
            // player won
            console.log('dealer busted')
            document.getElementById("cell-21").innerHTML = parseInt(document.getElementById("cell-21").innerHTML) + 1
            restart()
            return
        } else if(dealer_total >= 17) {
            break
        }

    }

    // go to comparision btw dealer and player cards
    check_player_dealer_total()

}



const check_player_dealer_total = () => {

    if (player_total > dealer_total){
        // player won
        console.log('player won')
        document.getElementById("cell-21").innerHTML = parseInt(document.getElementById("cell-21").innerHTML) + 1
        restart()
    } else if (dealer_total > player_total){
        // dealer won
        console.log('dealer won')
        document.getElementById("cell-22").innerHTML = parseInt(document.getElementById("cell-22").innerHTML) + 1
        restart()
    } else {
        // tie
        console.log('tie')
        document.getElementById("cell-23").innerHTML = parseInt(document.getElementById("cell-23").innerHTML) + 1
        restart()
    }

}

//when stay is clicked
const move_to_dealer = () => {
    dealer_draw_card()
}


//start new game, but points not erased
const restart = () => {
    player_cards = []
    dealer_cards = []
    dealer_total = 0
    player_total = 0
    init_cards()
    console.log(player_cards, dealer_cards, player_total, dealer_total)
}




//dom stuff
document.addEventListener("DOMContentLoaded", function(event) {
    init_cards()
    console.log(player_cards, dealer_cards, player_total, dealer_total)
});
