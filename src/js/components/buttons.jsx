import React from 'react';
import { connect } from 'react-redux'
import { INIT, PAUSED, ACTIVE, setGameState } from '../actions/gameStateAction';
import { resetSticksCount } from '../actions/sticksAction';

export class Buttons extends React.Component {
    // TODO: Disallow or handle play/pause when in won and lost game states
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
        this.props.resetSticksCount();
    }

    togglePlayGame() {
        const {gameState} = this.props;
            if(gameState.name === PAUSED || gameState.name === INIT) {
                this.props.setGameState(ACTIVE);
            } else {
                this.props.setGameState(PAUSED);
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
        resetSticksCount: () => {
            dispatch(resetSticksCount());
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Buttons)