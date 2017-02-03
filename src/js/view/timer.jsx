import React from 'react';
import MicroEvent from 'microevent';

export default class Timer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            timeInSeconds: 30
        };
    }

    componentDidMount(){
        this.bind('tick', function(time) {
            this.setState({
                timeInSeconds: time / 1000
            });
        });
    }

    render() {
        return (
            <div id="timerContainer">
                <div id="timerDiv">{ this.state.timeInSeconds }</div>
            </div>
        );
    }
}

MicroEvent.mixin(Timer);