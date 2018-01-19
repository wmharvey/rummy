import PlayingCard from './PlayingCard';

function makeDeck() {
  const suits = ['S', 'C', 'H', 'D'];
  return suits.reduce((prevVal, curVal) => {
    for (let i = 1; i <= 13; i++) {
      prevVal.push(new PlayingCard(curVal, i));
    }
    return prevVal;
  }, []);
}

class CardDeck {
  constructor() {
    this.deck = makeDeck();
    this.discardPile = [];
  }

  shuffle() {
    this.deck = makeDeck();
    const deckWithNums = this.deck.map(card => {
      card.randomNum = Math.random();
      return card;
    });
    this.deck = deckWithNums.sort((a, b) => a.randomNum - b.randomNum);
  }

  deal(numPlayers) {
    let hands = [];
    for (let i = 0; i < numPlayers; i++) {
      const playerHand = [];
      for (let j = 0; j < 7; j++) {
        playerHand.push(this.deck.pop());
      }
      hands.push(playerHand);
    }
    return hands;
  }

  draw() {
    return this.deck.pop();
  }

  discardCard(card) {
    this.discardPile.push(card);
  }

  getLastDiscard() {
    return this.discardPile.pop();
  }

  displayLastDiscard() {
    const length = this.discardPile.length;
    return this.discardPile[length - 1];
  }
}

export default CardDeck;