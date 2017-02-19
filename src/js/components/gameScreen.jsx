import React from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import * as gameActions from '../actions/gameStateAction';
import sticksSVG from '../classes/sticksSvg';

export class GameScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sticksSVG: new sticksSVG()
        }
    }

    render() {
        return (
            <div ref="gameArea" className="gameArea gameScreen"></div>
        );
    }

    componentDidMount() {
        const el = ReactDOM.findDOMNode(this.refs.gameArea);

        this.state.sticksSVG.create(el, this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.createdAt > this.props.createdAt){
            const el = ReactDOM.findDOMNode(this.refs.gameArea);

            this.state.sticksSVG.update(el, nextProps);
        }
    }
}

function mapStateToProps(state) {
    const sticks = state.sticks;

    return {
        gameLevel: sticks.initialSticksCount,
        createdAt: sticks.createdAt
    };
}

var mapDispatchToProps = (dispatch) => {
    return {
        winGame: () => {
            dispatch(gameActions.winGame());
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GameScreen)