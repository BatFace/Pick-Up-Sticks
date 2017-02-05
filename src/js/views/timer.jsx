import React from 'react';

export default class Timer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            timeInSeconds: 30
        };
    }

    render() {
        return (
            <div id="timerContainer">
                <div id="timerDiv">{ this.state.timeInSeconds }</div>
            </div>
        );
    }
}