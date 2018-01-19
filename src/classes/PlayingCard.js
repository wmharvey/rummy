const faceLabelMap = {
  '1': 'A',
  '11': 'J',
  '12': 'Q',
  '13': 'K'
};

class PlayingCard {
  constructor(suit, faceValue) {
    this.suit = suit;
    this.faceValue = faceValue;
    this.faceLabel = getFaceLabel(faceValue);

    function getFaceLabel(faceValue) {
      let label = faceLabelMap[faceValue];
      if (!label) {
        label = faceValue;
      }
      return label;
    }
  }

  displayCard() {
    return `${this.faceLabel} : ${this.suit}`;
  }
}

export default PlayingCard;