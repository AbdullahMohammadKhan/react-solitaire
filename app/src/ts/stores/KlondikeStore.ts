import {PackOfCards, PlayingCard, Suit} from '../models/playingCards';
import {Foundation, PileType} from '../models/klondike';
import {observable, useStrict, action} from 'mobx';
import {PileProps, KlondikeCardProps} from '../components'

const klondikeConfiguration = {
  tableauCount: 7
}

useStrict(true);

export class KlondikeStore {
  @observable pack: PackOfCards;
  @observable stock: PlayingCard[];
  @observable waste: PlayingCard[];
  @observable foundations: Foundation;
  @observable tableau: PlayingCard[][];
  @observable numMoves: number; //  cannot use moves.length, as numMoves also includes undos
  @observable moves = [];

  /**
   *
   */
  private constructor() {
    this.stockClicked = this.stockClicked.bind(this);
    this.undo = this.undo.bind(this);
    this.setupGame = this.setupGame.bind(this);
    this.moveCard = this.moveCard.bind(this);
  }

  public static init() {
    const store = new KlondikeStore();
    store.pack = new PackOfCards();

    store.setupGame();
    return store;
  }  

  setupGame() {
    let cards = this.pack.cards;

    this.tableau = [];
    
    for (let i = 0; i < klondikeConfiguration.tableauCount; i++) {
      this.tableau.push([]);
    }
    
    for (let i = 0; i < klondikeConfiguration.tableauCount; i++) {
      let firstCard = true;
      for (let j = i; j < klondikeConfiguration.tableauCount; j++) {
        let card = cards.pop();
        card.show = firstCard;
        this.tableau[j].push(card);

        firstCard = false;
      }
    }
    
    this.foundations = {
      'Spades': new Array<PlayingCard>(),
      'Clubs': new Array<PlayingCard>(),
      'Diamonds': new Array<PlayingCard>(),
      'Hearts': new Array<PlayingCard>(),
    }

    this.stock = cards;
    this.numMoves = 0;
    this.moves = [];
  }

  undo() {
    console.log('undo');
  } 

  stockClicked() {
    this.waste = [this.stock.pop(), this.stock.pop(), this.stock.pop()];
  }

  canMoveCard(card: PlayingCard, destPileProps: PileProps) {
      if (!card.show) return false;
      const { 
        pileType: destPileType, 
        pile: destPile, 
        foundationSuit: destFoundationSuit, 
        tableauColumn: destTableauColumn 
      } = destPileProps;

      switch (destPileType) {
        case 'Tableau':
          if (destTableauColumn === undefined) throw new Error('Tableau column number wasn\'t supplied');
          const targetColumn = this.tableau[destTableauColumn];
          if (targetColumn.length === 0) return true;
          const topCard = targetColumn[targetColumn.length - 1];
          return topCard.numericRank === card.numericRank + 1 && topCard.color !== card.color;
        case 'Foundation':
          if (!destFoundationSuit) throw new Error('Foundation suit not supplied');
          if (card.suit !== destFoundationSuit) return false;
          if (destPile.length === 0) { 
            if (card.rank === 'Ace') return true;
            return false;
          }
          const targetCard = destPile[destPile.length - 1];
          return targetCard.numericRank === card.numericRank - 1;
      }
    return false;
  }

  @action moveCard(srcCardProps: KlondikeCardProps, destPileProps: PileProps) {
    let { 
      pileType: destPileType, 
      pile: destPile, 
      foundationSuit: destFoundationSuit, 
      tableauColumn: destTableauColumn 
    } = destPileProps;

    const {
      pileProps: srcPileProps,
      pilePosition: srcPilePosition,
    } = srcCardProps;

    const { 
      pileType: srcPileType, 
      pile: srcPile, 
      foundationSuit: srcFoundationSuit, 
      tableauColumn: srcTableauColumn 
    } = srcPileProps;


    let srcCards = srcPile.splice(srcPilePosition);
    
    if (srcCards === null || !srcCards.length) throw new Error('could not find source cards');
    switch (srcPileType) {
      case 'Foundation':
        srcCards = srcPile.splice(srcPilePosition);
    }
    
    destPile.push(...srcCards);
  }
}