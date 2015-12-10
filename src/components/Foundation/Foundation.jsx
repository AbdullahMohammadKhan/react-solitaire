"use strict";
var React = require("react");
var PlayingCards = require('../../models/playing-cards');
var PileTypes = require('../../constants/PileTypes');
var Pile = require('../Pile/Pile');
var KlondikeCard = require('../KlondikeCard/KlondikeCard');
class Foundation extends React.Component {
    constructor(props) {
        super(props);
    }
    emptyFoundationClicked() {
        if (this.props.clickHandler) {
            let card = this.props.pile.length > 0 ? this.props.pile[this.props.pile.length - 1] : null;
            this.props.clickHandler({ pileType: PileTypes.FOUNDATION, row: this.props.row, card: card });
        }
    }
    render() {
        let layout = PlayingCards.Layout.Squared;
        let card = this.props.pile.length > 0 ? this.props.pile[this.props.pile.length - 1] : null;
        let validDropTarget = this.props.selected != null && KlondikeCard.canMove(this.props.selected, { pileType: PileTypes.FOUNDATION, row: this.props.row, card: card });
        return (<div className="Foundation" onClick={this.props.pile.length == 0 && this.emptyFoundationClicked.bind(this)} style={{
            float: "left"
        }}>
        <div style={{
            position: "relative",
            width: "80px",
            height: "112px",
            border: "1px solid #CCC",
            borderRadius: "5px",
            margin: "10px 5px",
            backgroundImage: "url(" + PlayingCards.Card.getPip(this.props.suit) + ")",
            backgroundPosition: "18px 30px"
        }}>
          <Pile layout={layout} {...this.props}/>
          
        </div>
      </div>);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Foundation;
