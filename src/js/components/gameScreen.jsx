import React from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { setGameState } from '../actions/gameStateAction';
import sticksSVG from '../classes/sticksSvg';

export class GameScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sticksSVG: new sticksSVG(),
            gameLevel: 3 // TODO: needs to come from level control
        }
    }

    render() {
        return (
            <div id="gameArea" ref="gameArea" className="gameScreen"></div>
        );
    }

    componentDidMount() {
        const el = ReactDOM.findDOMNode(this.refs.gameArea);
        this.state.sticksSVG.create(el, this.props, this.state);
    }
}

function mapStateToProps(state) {
    return {
        gameLevel: state.sticks.initialSticksCount
    };
}

var mapDispatchToProps = (dispatch) => {
    return {
        setGameState: (newGameState) => {
            dispatch(setGameState(newGameState));
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GameScreen)