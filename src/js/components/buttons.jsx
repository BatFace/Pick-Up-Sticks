import React from 'react';
import { connect } from 'react-redux'
import { INIT, PAUSED, ACTIVE, setGameState } from '../actions/gameStateAction';
import { start, stop, reset } from '../actions/timerAction';

export class Buttons extends React.Component {
    render() {
        return (
            <div id="buttonsContainer">
                <div className="gameButton enabled" id="playPauseButton" onClick={ this.togglePlayGame.bind(this) }></div>
                <div className="gameButton" id="restartButton" onClick={ this.restartGame.bind(this) }></div>
            </div>
        );
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.gameState === this.props.gameState){
            this.setState({
                gameState: nextProps.gameState
            })
        }
    }

    restartGame() {
        this.props.setGameState(INIT);
        this.props.resetTimer();
    }

    togglePlayGame() {
    const {gameState} = this.props;

        debugger;
        if(gameState.name === PAUSED || gameState.name === INIT) {
            this.props.setGameState(ACTIVE);
            this.props.startTimer();
        } else {
            this.props.setGameState(PAUSED);
            this.props.stopTimer();
        }
    }
}

function mapStateToProps(state) {
    return {
        gameState: state.gameState
    }
}

var mapDispatchToProps = (dispatch) => {
    return {
        setGameState: (newGameState) => {
            dispatch(setGameState(newGameState));
        },
        startTimer: () => {
            dispatch(start());
        },
        stopTimer: () => {
            dispatch(stop());
        },
        resetTimer: () => {
            dispatch(reset());
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Buttons)