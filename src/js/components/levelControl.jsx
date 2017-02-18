import React from 'react';
import { connect } from 'react-redux';
import { setNewSticksCount } from '../actions/sticksAction';

export class LevelControl extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="gameLevelForm">
                <div id="levelDisplayContainer"> Level
                    <input title="levelNumericControl"
                           type="number"
                            id="levelNumericControl"
                            min="1"
                            max="999"
                            step="1"
                            defaultValue={ this.props.gameLevel }
                            onChange={ this.props.setSticksCount }/>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        gameLevel: state.sticks.initialSticksCount
    };
}

var mapDispatchToProps = (dispatch) => {
    return {
        setSticksCount: (e) => {
            dispatch(setNewSticksCount(e.target.value));
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LevelControl)

// TODO: Pulse level display on gameState.WON
// function pulseLevelDisplay(){
//     $("#levelNumericControl")
//         .fadeOut(100).fadeIn(100)
//         .fadeOut(100).fadeIn(100);
// }
