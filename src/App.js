import React, { Component } from 'react';
import './App.css';
import CardDeck from './classes/CardDeck';
import styled from 'styled-components';
import checkForWin from './winningHandChecker';

const startingState = {
  numPlayers: 2,
  hands: [],
  turn: null
};

class App extends Component {
  constructor() {
    super();
    
    this.CardDeck = new CardDeck();
    this.state = startingState;
  }

  shuffle() {
    this.CardDeck.shuffle();
    this.setState(startingState);
  }

  handleNumPlayerChange(e) {
    this.setState({ numPlayers: e.target.value });
  }
  
  deal(numPlayers) {
    const hands = this.CardDeck.deal(numPlayers);
    this.setState({ hands: hands, turn: 0 });
  }

  selectCard(card) {
    this.setState({ selectedCard: card });
  }

  discardCard(selectedCard) {
    this.CardDeck.discardCard(selectedCard);

    // remove the selected card from the players hand
    const newHand = this.state.hands[this.state.turn].filter(card => {
      return card !== selectedCard;
    });

    const newHands = this.state.hands.map((hand, i) => {
      if (i === this.state.turn) {
        return newHand;
      }
      return hand;
    });

    // pass turn to next player, resetting to 0 if last player
    let turn = this.state.turn + 1;
    if (turn > this.state.hands.length - 1) {
      turn = 0;
    }

    this.setState({
      hands: newHands,
      turn,
      lastDiscarded: selectedCard,
      selectedCard: null
    });

    // check for winning hand, end game if this returns true
    const isWinningHand = checkForWin(newHand);
  }

  drawCard(pile) {
    let newCard;
    if (pile === 'deck') {
      newCard = this.CardDeck.draw();
    } else {
      newCard = this.CardDeck.getLastDiscard();
    }

    // give card to player who's turn it is
    const newHands = this.state.hands.map((hand, i) => {
      if (i === this.state.turn) {
        hand.push(newCard);
      }
      return hand;
    });

    this.setState({ hands: newHands, lastDiscarded: this.CardDeck.displayLastDiscard() });
  }

  displayHand(hand) {
    return hand.map((card, i) => {
      return <Hand key={i} onClick={ () => this.selectCard(card) } selected={this.state.selectedCard} card={card}>{ card.displayCard() }</Hand>;
    });
  }

  render() {
    return (
      <div className="App">
        <button onClick={ () => this.shuffle() }>Click to Shuffle</button>
        Select the number of players
        <select value={this.state.numPlayers} onChange={ (e) => this.handleNumPlayerChange(e)}>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
        </select>
        <button onClick={ () => this.deal(this.state.numPlayers) }>Click to Deal</button>

        <Row>
          <StyledCardDeck onClick={ () => this.drawCard('deck') }>Card Deck Number: { this.CardDeck.deck.length }</StyledCardDeck>
          <StyledCardDeck
            onClick={ () => this.drawCard('discard') }
          >
            Discard Pile Number: { this.state.lastDiscarded ? this.state.lastDiscarded.displayCard() : 'None' }
          </StyledCardDeck>
        </Row>

        <div>Game Below</div>

        <Column>
          { this.state.hands.length > 0 &&
            this.state.hands.map((hand, i) => {
              return (
                <Players key={i} turn={ this.state.turn } player={i}>{ this.displayHand(hand) }</Players>
              );
            })
          }
        </Column>

        <button onClick={ () => this.discardCard(this.state.selectedCard) }>Discard</button>
      </div>
    );
  }
}

export default App;

const StyledCardDeck = styled.div`
  border: 1px solid black;
  width: 150px;
  height: 150px;
`;
const Column = styled.div`
  display: flex;
  flex-direction: column
`;
const Row = styled.div`
  display: flex;
  flex-direction: row
`;
const Players = styled.div`
  display: flex;
  border: ${props => (props.turn === props.player) ? '2px solid purple': null}
`;
const Hand = styled.span`
  border: 1px solid black;
  margin: 5px;
  background-color: ${props => props.selected === props.card ? 'blue' : 'clear'}
`;