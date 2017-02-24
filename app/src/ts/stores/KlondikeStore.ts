import {PackOfCards, PlayingCard} from '../models/playingCards';
import {observable} from 'mobx';
import {PileProps} from '../components'

const klondikeConfiguration = {
  tableauCount: 7
}

export class KlondikeStore {
  @observable pack: PackOfCards;
  @observable stock: PlayingCard[];
  @observable waste: PlayingCard[];
  @observable foundations: PlayingCard[][];
  @observable tableau: PlayingCard[][];
  @observable numMoves: number; //  cannot use moves.length, as numMoves also includes undos
  @observable moves = [];

  /**
   *
   */
  constructor() {
    this.stockClicked = this.stockClicked.bind(this);
    this.undo = this.undo.bind(this);
    this.setupGame = this.setupGame.bind(this);
  }

  public static init() {
    const store = new KlondikeStore();
    store.pack = new PackOfCards();

    store.setupGame();
    return store;
  }  

  setupGame() {
    let cards = this.pack.cards;
    this.foundations = [[], [], [], []];

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

  canMoveCard() {
    return true;
  }

  moveCard(src: PlayingCard, pile) {
    pile.push(src);

  }
}