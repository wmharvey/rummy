# Directions to Set Up

Run `yarn install` to download all dependencies
Run `npm start` to run the app locally
A widow will open automatically in browser with the project

## Improvements

1. I only got halfway through Part 2, I did not complete the check for a winning hand
3. PlayingCard.js
... In PlayingCard.js, the displayCard function returns a very simple string with the card label and suit, this would be better as styled jsx that looks more like a regular playing card

4. CardDeck.js
... I use a lot of for loops, with more time these could be made more functional. I use lodash a lot at my work, which provides a method _.times that would work similarly
... Shuffle function adds a property to the Playing Cards, I should remove this property after it's done shuffling

5. App.js
... I put all the game logic in this file, but it's not organized very clearly. Separating the game logic from the display would be ideal. I also didn't have time to put in validators, and prevent users from trying to do illegal moves.
... User prompts would be good, so the user knows to draw, then select a card to discard, then pressing the discard button. If a user does not follow the order, the game will not work.
... It's styled very poorly, but I did not consider this a priority
... It could show only the hand of the person who's turn it is

6. winningHandChecker.js
... I did not have time to get very far on this. It will take a bit more time to write a combination function to get all the possible combinations of 3 from the hand. I actually did not come up with a good/efficient way to do this.
... The checkIsRunningMeld and checkIsSetMeld functions are similar, but I don't think I would use the reduce function if I were to rewrite it. It doesn't stop if the set has already been confirmed to not be a meld, so it's not very efficient. It's also not reducing the set down to anything, I just used it as a temporary way to loop over an array holding onto the last card.

7. Tests
... Could add tests for the classes and functions easily, would take more time to make App.js testable