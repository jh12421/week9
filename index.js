//this class represents a single card with rank and suit
class Card {
    constructor(rank, suit) {
        this.rank = rank;
        this.suit = suit;
    }
}
//this class represents a deck of cards
class Deck {
    constructor() {
        this.cards = [];
        const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
       //creates a deck of 52 cards
        for (let suit of suits) {
            for (let rank of ranks) {
                this.cards.push(new Card(rank, suit));
            }
        }
        this.shuffle();
    }
  //shuffles the deck
    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }
   //draws a card
    drawCard() {
        return this.cards.pop();
    }
   //gets number of cards left in the deck
    get length() {
        return this.cards.length;
    }
}
//represents a player in the game
class Player {
    constructor(name) {
        this.name = name;
        this.points = 0;
        this.hand = [];
    }
   //plays a card from players hand
    playCard() {
        return this.hand.pop();
    }
    //adds points to players score
    addPoints(points) {
        this.points += points;
    }
   //gets players score
    get score() {
        return this.points;
    } 
    //gets numbers of cards in players hand
    get handSize() {
        return this.hand.length;
    }
}
  //this class manages the logic of the game
class Game {
    constructor() {
        this.deck = new Deck();
        this.player1 = new Player('Player 1');
        this.player2 = new Player('Player 2');
        this.dealCards();
    }
   //deals cards 
    dealCards() {
        while (this.deck.length > 0) {
            this.player1.hand.push(this.deck.drawCard());
            this.player2.hand.push(this.deck.drawCard());
        }
    }
  //play a turn
    playTurn() {
        const card1 = this.player1.playCard();
        const card2 = this.player2.playCard();
        const rank1 = this.getRankValue(card1.rank);
        const rank2 = this.getRankValue(card2.rank);
        if (rank1 > rank2) {
            this.player1.addPoints(1);
        } else if (rank1 < rank2) {
            this.player2.addPoints(1);
        }
    }
   //gets value of the card
    getRankValue(rank) {
        const values = {
            '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14
        };
        return values[rank];
    }
   //plays game until player runs out of cards
    playGame() {
        while (this.player1.handSize > 0 && this.player2.handSize > 0) {
            this.playTurn();
        }
        this.displayScore();
    }
   //displays the score and the winner
    displayScore() {
        console.log(`${this.player1.name}: ${this.player1.score}`);
        console.log(`${this.player2.name}: ${this.player2.score}`);
        if (this.player1.score > this.player2.score) {
            console.log('Player 1 Wins');
        } else if (this.player1.score < this.player2.score) {
            console.log('Player 2 Wins');
        } else {
            console.log('Tie Game');
        }
    }
}

const game = new Game();
game.playGame();



