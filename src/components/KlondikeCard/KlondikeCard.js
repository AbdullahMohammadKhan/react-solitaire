import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as klondikeActions from 'redux/modules/klondike';
import * as PlayingCards from '../../models/playing-cards';

export default class KlondikeCard extends Component {

    constructor(props) {
        super(props);
        this.clickTimeoutId = null;
        this.handleClick = this.handleClick.bind(this);
    }

    static renderOverlay(color) {
        return (<div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            zIndex: 1,
            opacity: 0.5,
            backgroundColor: color,
        }}></div>);
    }

    handleClick() {
        const doubleClickDelay = 225;
        let payload = { pileType: this.props.pileType, row: this.props.row, card: this.props.card, pos: this.props.pos, pileSize: this.props.pileSize };
        if (!this.clickTimeoutId) {
            this.clickTimeoutId = setTimeout(() => {
                this.props.clickHandler(payload);
                this.clickTimeoutId = null;
            }, doubleClickDelay);
        }
        else {
            this.clickTimeoutId = clearTimeout(this.clickTimeoutId);
            this.props.doubleClickHandler(payload);
        }
    }

    render() {
        let style = Object.assign(this.props.style, { position: "relative", width: "80px", height: "112px" });
        let selected = this.props.selected != null && this.props.selected.card.toString() == this.props.card.toString();
        let validDropTarget = !selected && this.props.card.show && this.props.selected != null && KlondikeCard.canMove(this.props.selected, { pileType: this.props.pileType, card: this.props.card, row: this.props.row, pos: this.props.pos, pileSize: this.props.pileSize });
        return (<div className="KlondikeCard" onClick={this.props.card.show && this.handleClick.bind(this)} style={style}>
              <img style={{ width: "100%" }} src={this.props.card.display()}/>
              {selected && KlondikeCard.renderOverlay('aquamarine')}

          </div>);
    }
}