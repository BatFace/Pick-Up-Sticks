import React from 'react';
import { connect } from 'react-redux'

export class PauseScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="pauseScreen" className="gameScreen">
                <div id="pauseScreenText">
                    <span className="active">{ this.props.message }</span>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        message: state.gameState.message
    }
}

export default connect(
    mapStateToProps
)(PauseScreen)
