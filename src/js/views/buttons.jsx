import React from 'react';
import { connect } from 'react-redux'
import { INIT, PAUSED, ACTIVE, setGameState } from '../actions/gameStateAction';

export class Buttons extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        // TODO: re-implement/get rid of button disabling
        //{'gameButton ' + this.state.current === PAUSED ? '' : 'enabled'}
        return (
            <div id="buttonsContainer">
                <div className="gameButton enabled" id="playPauseButton" onClick={ this.togglePlayGame }></div>
                <div className="gameButton" id="restartButton" onClick={ this.restartGame }></div>
            </div>
        );
    }

    restartGame() {
        setGameState(INIT);
    }

    togglePlayGame() {
        if(this.props.gameState === PAUSED) {
           setGameState(ACTIVE);
        } else {
            setGameState(PAUSED);
        }
    }
}

function mapStateToProps(state) {
    return {
        gameState: state.gameState
    }
}

export default connect(
    mapStateToProps
)(Buttons)