import React from 'react';
import { connect } from 'react-redux'

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
                        value="1"
                        onChange={ this.onChange.bind(this) }/>
                </div>
            </div>
        );
    }

    onChange(value) {
        this.setState({
            level: value
        });
    }

}

function mapStateToProps(state) {
    return {
        //timer: state.timer
    }
}

export default connect(
    mapStateToProps
)(LevelControl)


