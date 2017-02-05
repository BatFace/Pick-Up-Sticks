import React from 'react';

export default class LevelControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div id="gameLevelForm">
                <div id="levelDisplayContainer">
                    Level
                    <input title="levelNumericControl"
                           type="number"
                           id="levelNumericControl"
                           min="1"
                           max="999"
                           step="1"
                           value="1"/>
                </div>
            </div>
        );
    }
}
