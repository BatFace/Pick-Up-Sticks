import React from 'react';
import { connect } from 'react-redux'
import { INIT, PAUSED, ACTIVE, setGameState } from '../actions/gameStateAction';

export class Buttons extends React.Component {
    render() {
        return (
            <div id="buttonsContainer">
                <div className="gameButton enabled" id="playPauseButton" onClick={ this.togglePlayGame.bind(this) }></div>
                <div className="gameButton" id="restartButton" onClick={ this.restartGame.bind(this) }></div>
            </div>
        );
    }

    restartGame() {
        this.props.setGameState(INIT);
    }

    togglePlayGame() {
    const {gameState} = this.props;

        if(gameState.name === PAUSED) {
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

var mapDispatchToProps = function(dispatch){
    return {
        setGameState: function(newGameState){
            dispatch(setGameState(newGameState));
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Buttons)