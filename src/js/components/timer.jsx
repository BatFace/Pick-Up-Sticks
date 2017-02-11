import React from 'react';
import { connect } from 'react-redux';
import { getTimeInSeconds } from '../reducers/timerReducer';

export const Timer = ({ time }) => (
    <div id="timerContainer">
        <div id="timerDiv">{ time }</div>
    </div>
)

function mapStateToProps(state) {
    return {
        time: getTimeInSeconds(state.timer)
    }
}

export default connect(
    mapStateToProps
)(Timer)