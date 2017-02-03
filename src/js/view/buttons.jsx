import React from 'react';
import MicroEvent from 'microevent';
import { INIT, PAUSED } from '../class/states';

export default class Buttons extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount(){
        this.bind('gameState', function(gameState) {
            this.setState({
                current: gameState
            });
        });
    }

    render() {
        return (
            <div id="buttonsContainer">
                <div className={'gameButton' + this.state.current === PAUSED ? '' : 'enabled'} id="playPauseButton" onClick={ this.pauseGame }></div>
                <div className="gameButton" id="restartButton" onClick={ this.restartGame }></div>
            </div>
        );
    }

    restartGame() {
        this.trigger('gameState', INIT);
    }

    pauseGame() {
        this.trigger('gameState', PAUSED);
    }
}

MicroEvent.mixin(Buttons);