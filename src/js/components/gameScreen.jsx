import React from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { setGameState } from '../actions/gameStateAction';
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
            <div id="gameArea" ref="gameArea" className="gameScreen"></div>
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
        setGameState: (newGameState) => {
            dispatch(setGameState(newGameState));
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GameScreen)