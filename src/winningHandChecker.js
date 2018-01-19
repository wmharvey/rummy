const isWinningHand = hand => {
  // get all combinations of 3 from hand
  // analyze combinations of 3 and remaining 4 to see if they are a "meld"
  // if both are a meld, return true, else return false

  // For example:
  // const isRunningMeld = checkIsRunningMeld([ hand[0], hand[1], hand[2] ]);
  // const isSetMeld = checkIsSetMeld([ hand[0], hand[1], hand[2] ]);
  //
  // return isRunningMeld && isSetMeld;

  return false;
};

export default isWinningHand;

function checkIsRunningMeld(set) {
  // sort by the face value from low to high
  set.sort((a, b) => {
    return a.faceValue - b.faceValue;
  });

  let isSequencial = true;

  set.reduce((acc, curVal) => {
    if (acc.faceValue + 1 !== curVal.faceValue) {
      isSequencial = false;
    }
    acc = curVal;
    return acc;
  });

  return isSequencial;
}

function checkIsSetMeld(set) {
  let isSet = true;

  set.reduce((acc, curVal) => {
    if (acc.faceValue !== curVal.faceValue) {
      isSet = false;
    }
    return acc;
  });

  return isSet;
}