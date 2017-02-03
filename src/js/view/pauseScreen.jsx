import React from 'react';
import States from '../class/states';
import MicroEvent from 'microevent';

export default class PauseScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: {
                message : 'test'
            }
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
            <div id="pauseScreen" className="gameScreen">
                <div id="pauseScreenText">
                    <span className="active">{ this.state.current.message }</span>
                </div>
            </div>
        );
    }
}

MicroEvent.mixin(PauseScreen);
