"use strict";
var React = require("react");
var PlayingCards = require('../../models/playing-cards');
var PileTypes = require('../../constants/PileTypes');
var Pile = require('../Pile/Pile');
var KlondikeCard = require('../KlondikeCard/KlondikeCard');
class Tableau extends React.Component {
    constructor(props) {
        super(props);
    }
    emptyPileClickHandler(event) {
        if (this.props.clickHandler) {
            this.props.clickHandler({ pileType: PileTypes.EMPTYTABLEAU, row: this.props.row });
        }
    }
    ;
    render() {
        let validDropTarget = this.props.selected != null && this.props.pile.length == 0 && KlondikeCard.canMove(this.props.selected, { pileType: PileTypes.EMPTYTABLEAU, row: this.props.row });
        return (<div className="Tableau" onClick={this.props.pile.length == 0 && this.emptyPileClickHandler.bind(this)} style={{
            position: "relative",
            width: "80px",
            height: "112px",
            border: "1px solid #CCC",
            borderRadius: "5px",
            margin: "10px 5px",
            backgroundPosition: "18px 30px",
            float: "left"
        }}>
              <Pile layout={PlayingCards.Layout.FannedDown} pileType={PileTypes.TABLEAUPILE} selected={this.props.selected} row={this.props.row} pile={this.props.pile} clickHandler={this.props.clickHandler} doubleClickHandler={this.props.doubleClickHandler}/>
              
            </div>);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Tableau;
