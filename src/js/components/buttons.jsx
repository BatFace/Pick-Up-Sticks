import React from 'react';
import { connect } from 'react-redux'
import * as gameActions from '../actions/gameStateAction';
import { resetSticksCount } from '../actions/sticksAction';

export class Buttons extends React.Component {

    getPlayPauseDisabledClass() {
        return !this.props.gameState.canPlayPause ? 'disabled' : '';
    }

    restartGame() {
        this.props.resetSticksCount();
    }

    togglePlayGame() {
        const { gameState } = this.props;
        if(gameState.name === gameActions.PAUSED
            || gameState.name === gameActions.INIT) {
            this.props.playGame();
        } else {
            this.props.pauseGame();
        }
    }

    render() {
        return (
            <div className="buttonsContainer">
                <div className={"playPauseButton gameButton " + this.getPlayPauseDisabledClass()}
                     onClick={this.togglePlayGame.bind(this)}>

                </div>
                <div className="restartButton gameButton"
                     onClick={this.restartGame.bind(this)}>
                </div>
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
}

function mapStateToProps(state) {
    return {
        gameState: state.gameState
    }
}

var mapDispatchToProps = (dispatch) => {
    return {
        playGame: () => {
            dispatch(gameActions.playGame());
        },
        pauseGame: () => {
            dispatch(gameActions.pauseGame());
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