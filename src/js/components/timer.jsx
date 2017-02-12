import React from 'react';
import { connect } from 'react-redux';

export const Timer = ({ time }) => (
    <div id="timerContainer">
        <div id="timerDiv">{ time }</div>
    </div>
);

function mapStateToProps(state) {
    return {
        time: state.timer.seconds
    }
}

export default connect(
    mapStateToProps
)(Timer)