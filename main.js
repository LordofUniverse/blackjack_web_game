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

const colours_list = [
    'DIAMONDS', 'HEARTS', 'SPADES', 'CLUBS'
]

// Current cards player or dealer is having. Dealer is computer 
let player_cards = []
let player_color_cards = []

let dealer_cards = []
let dealer_color_cards = []

let player_url_list = []
let dealer_url_list = []

// value of sum of cards
let player_total = 0
let dealer_total = 0


// to save loaded images into cache
const preloadImages = (array) =>  {
    if (!preloadImages.list) {
        preloadImages.list = [];
    }
    var list = preloadImages.list;
    for (var i = 0; i < array.length; i++) {
        var img = new Image();
        img.onload = function() {
            var index = list.indexOf(this);
            if (index !== -1) {
                // remove image from the array once it's loaded
                // for memory consumption reasons
                list.splice(index, 1);
            }
        }
        list.push(img);
        img.src = array[i];
    }
}


// check if player got blackjack but only once at start of game
const player_check_blackjack = (cards) => {

    if (cards.includes('A') && (cards.includes('10') || cards.includes('J') || cards.includes('Q') || cards.includes('K')) ){

        return true

    } 

    return false

}


//finds if u r busted or else gives total value
const calculate_player = (cards) => {

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
        document.getElementById('you').innerHTML = value
        return 'busted'
    } else if (no_of_A > 0){
        if (value + no_of_A*11 > 21){
            if (value + no_of_A > 21){
                document.getElementById('you').innerHTML = value + no_of_A
                return 'busted'
            } else {
                document.getElementById('you').innerHTML = value + no_of_A
                return (value + no_of_A).toString()
            }
        } else {
            document.getElementById('you').innerHTML = value + no_of_A*11
            return  (value + no_of_A*11).toString()
        }
    }

    document.getElementById('you').innerHTML = value

    return value.toString()

}

const calculate_dealer = (cards) => {

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
        document.getElementById('dealer').innerHTML = value
        return 'busted'
    } else if (no_of_A > 0){
        if (value + no_of_A*11 > 21){
            if (value + no_of_A > 21){
                document.getElementById('dealer').innerHTML = value + no_of_A
                return 'busted'
            } else {
                document.getElementById('dealer').innerHTML = value + no_of_A
                return (value + no_of_A).toString()
            }
        } else {
            document.getElementById('dealer').innerHTML = value + no_of_A*11
            return  (value + no_of_A*11).toString()
        }
    }

    document.getElementById('dealer').innerHTML = value

    return value.toString()

}

const wait = (ms) => {
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
        end = new Date().getTime();
   }

}


// drawing the cards at start of the game
const init_cards = () => {
    for (let i = 0; i < 2; i++) {
        let rand = Math.floor(Math.random() * 13)
        let card = cards_list[rand]
        player_cards.push(card)

        
        let colour = colours_list[Math.floor(Math.random() * 4)]
        player_color_cards.push(colour)

        let url = 'IMAGES/' + colour + '/' + card + '.png'
        player_url_list.push(url)
    
    }


    document.getElementById("player-cards").innerHTML = ""
    
    preloadImages(player_url_list);

    // display cards
    for (let i = 0; i < 2; i++) {
        
        document.getElementById("player-cards").innerHTML += "<img class = 'smallimg' src = " + player_url_list[i] +" ></img>"
    
    }
    
    

    if (player_check_blackjack(player_cards)){
        // Player won, blackjack!
        alert('Its Blackjack! U won the game! Click ok to play again')
        wait(2000);
        restart()
        
    } 

    player_total = calculate_player(player_cards)

    for (let i = 0; i < 2; i++) {
        let card = cards_list[Math.floor(Math.random() * 13)]
        dealer_cards.push(card)
        
        let colour = colours_list[Math.floor(Math.random() * 4)]
        dealer_color_cards.push(colour)

        let url = 'IMAGES/' + colour + '/' + card + '.png'
        dealer_url_list.push(url)

    }  

    preloadImages(dealer_url_list);

    // display first card alone
    document.getElementById("dealer-cards").innerHTML = "<img class = 'smallimg' src = " + dealer_url_list[0] +" ></img>"
    document.getElementById("dealer-cards").innerHTML += "<div class = 'smallimg smallimg2'><img id = 'back' src = 'IMAGES/card_back.png' ></img></div>"

    dealer_total = calculate_dealer([dealer_cards[0]])

    if (dealer_total == 'busted'){
        // ui stuff
        alert('dealer got busted! U won the game! Click ok to win again')
        
        wait(2000)
        restart()
    } else if (player_total == 'busted'){
        // ui stuff
        alert('You got busted! Click ok to try again')
        wait(2000)
        restart()
    }

}

//player can draw a card as many times as he wants. after stay, dealer has to show his second card
const player_draw_card = () => {
    let rand = Math.floor(Math.random() * 13)
    let card = cards_list[rand]
    
    player_cards.push(card)

    let colour = colours_list[Math.floor(Math.random() * 4)]
    player_color_cards.push(colour)
    
    let url = 'IMAGES/' + colour + '/' + card + '.png'
    
    player_url_list.push(url)

    document.getElementById("player-cards").innerHTML = ''

    preloadImages(player_url_list);

    // display cards
    for (let i = 0; i < player_url_list.length; i++) {
        
        document.getElementById("player-cards").innerHTML += "<img class = 'smallimg' src = " + player_url_list[i] +" ></img>"
    
    }


    player_total = calculate_player(player_cards)

    if (player_total == 'busted'){
        // dealer won
        // show dealer cards
        document.getElementById("dealer-cards").innerHTML = ''

        for (let i = 0; i < dealer_url_list.length; i++) {

            document.getElementById("dealer-cards").innerHTML += "<img class = 'smallimg' src = " + dealer_url_list[i] +" ></img>"
        
        }

        document.getElementById("cell-22").innerHTML = parseInt(document.getElementById("cell-22").innerHTML) + 1
        alert('You got busted! Click ok to try again')
        wait(2000)
        restart()
    }

}

// dealer as to draw a new card untill his total is >= 17
const dealer_draw_card = () => {

    document.getElementById("dealer-cards").innerHTML = ''
    
    preloadImages(dealer_url_list);

    // display cards
    for (let i = 0; i < dealer_url_list.length; i++) {

        document.getElementById("dealer-cards").innerHTML += "<img class = 'smallimg' src = " + dealer_url_list[i] +" ></img>"
    
    }


    while (dealer_total < 17){
        
        let card = cards_list[Math.floor(Math.random() * 14)]
        dealer_cards.push(card)

        let colour = colours_list[Math.floor(Math.random() * 4)]
        dealer_color_cards.push(colour)
        
        let url = 'IMAGES/' + colour + '/' + card + '.png'
        
        dealer_url_list.push(url)
    
        
        dealer_total = calculate_dealer(dealer_cards)

        document.getElementById("dealer-cards").innerHTML = ''
        
        preloadImages(dealer_url_list);

        // display cards
        for (let i = 0; i < dealer_url_list.length; i++) {

            document.getElementById("dealer-cards").innerHTML += "<img class = 'smallimg' src = " + dealer_url_list[i] +" ></img>"
        
        }

        
        if (dealer_total == 'busted'){
            // player won
            alert('dealer got busted! You won the game! Click ok to win again')
            document.getElementById("cell-21").innerHTML = parseInt(document.getElementById("cell-21").innerHTML) + 1
            wait(2000)
            restart()
            return
        } else if(dealer_total >= 17) {
            break
        }

        wait(1000)

    }

    // go to comparision btw dealer and player cards
    check_player_dealer_total()

}



const check_player_dealer_total = () => {

    if (player_total > dealer_total){
        // player won
        alert('You won the game. Click ok to win again')
        document.getElementById("cell-21").innerHTML = parseInt(document.getElementById("cell-21").innerHTML) + 1
        wait(2000)
        restart()
    } else if (dealer_total > player_total){
        // dealer won
        alert('dealer won the game! Click ok to try again')
        document.getElementById("cell-22").innerHTML = parseInt(document.getElementById("cell-22").innerHTML) + 1
        wait(2000)
        restart()
    } else {
        // tie
        alert('Its a tie! Click ok to win this time')
        document.getElementById("cell-23").innerHTML = parseInt(document.getElementById("cell-23").innerHTML) + 1
        wait(2000)
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
    player_color_cards = []
    dealer_cards = []
    dealer_color_cards = []
    player_url_list = []
    dealer_url_list = []

    dealer_total = 0
    player_total = 0

    init_cards()
}




//dom stuff
document.addEventListener("DOMContentLoaded", function(event) {
    init_cards()
});
