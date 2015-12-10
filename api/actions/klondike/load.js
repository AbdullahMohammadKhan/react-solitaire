require('../../../src/models/playing-cards');

export function getKlondike(req) {
  let klondike = false;
  if (!klondike) {
    const pileCount = 7;
    let deck = new PlayingCards.DeckOfCards(false);
    deck.shuffle();

    let initialDeckSize = deck.length();

      let piles = [];
      for (let i = 0; i < pileCount; i++) {
        for (let j = pileCount; j >= i; j) {
          if (!piles[j]) {
            piles[j] = [];
          }
          let card = deck.getTopCard();
          if (card) {
            card.setShow(j == i);
            piles[j].push(card);
          }
        }
      }
      return piles;

    let foundationPiles = (function() {
      return [
        [],
        [],
        [],
        []
      ];
    })();
    klondike = {
      piles: tableauPiles(),
      foundationPiles,
      moves: [],
      moveCount: 0,
      waste: [],
      initialDeckSize
    };
    req.session.klondike = klondike;
  }
  return klondike;
}

export default function load(req) {
  return new Promise((resolve, reject) => {
    // make async call to database
    setTimeout(() => {
      resolve(getKlondike(req))
    }, 500); // simulate async load
  });
}
