import React from 'react';
import { connect } from 'react-redux';
import { ACTIVE } from '../actions/gameStateAction';


export class PauseScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    getStyle(){
        const displayValue = this.props.gameState.name !== ACTIVE ? 'block' : 'none';

        return { display: displayValue };
    }

    render() {
        return (
            <div id="pauseScreen"
                 style={this.getStyle()}
                 className="gameScreen">
                <div id="pauseScreenText">
                    <span className="active">{ this.props.gameState.message }</span>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        gameState: state.gameState
    }
}

export default connect(
    mapStateToProps
)(PauseScreen)