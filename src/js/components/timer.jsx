import React from 'react';
import { connect } from 'react-redux';
import { getTimeInSeconds } from '../reducers/timerReducer';

export const Timer = ({ time }) => (
    <div className="timerContainer">
        <div className="timerDiv">{ time }</div>
    </div>
);

function mapStateToProps(state) {
    const timeInSeconds = getTimeInSeconds(state.timer);

    return {
        time: timeInSeconds
    }
}

export default connect(
    mapStateToProps
)(Timer)