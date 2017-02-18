import React from 'react';
import { connect } from 'react-redux';
import { setNewSticksCount } from '../actions/sticksAction';

export class LevelControl extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            gameLevel: this.props.gameLevel,
            shouldPulse: this.props.isMax
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.gameLevel !== this.props.gameLevel) {
            this.setState({
                gameLevel: nextProps.gameLevel,
                shouldPulse: nextProps.isMax
            });
        }
    }

    render() {
        const { shouldPulse, setSticksCount} = this.props,
            { gameLevel } = this.state;

        return (
            <div id="gameLevelForm">
                <div id="levelDisplayContainer"> Level
                    <input className={shouldPulse ? 'maxLevel' : ''}
                           type="number"
                           id="levelNumericControl"
                           min="1"
                           max="999"
                           step="1"
                           value={ gameLevel }
                           onChange={ setSticksCount }/>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        gameLevel: state.sticks.initialSticksCount,
        shouldPulse: state.sticks.initialSticksCount === 999
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
