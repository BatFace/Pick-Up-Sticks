import React from 'react';
import { connect } from 'react-redux';
import { IN_PLAY } from '../actions/gameStateAction';


export class PauseScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    getStyle(){
        const displayValue = this.props.gameState.name !== IN_PLAY ? 'block' : 'none';

        return { display: displayValue };
    }

    render() {
        const { message } = this.props.gameState;

        return (
            <div className="pauseScreen gameScreen"
                style={this.getStyle()}>
                <div className="pauseScreenText">
                    <span className="active">{ message }</span>
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