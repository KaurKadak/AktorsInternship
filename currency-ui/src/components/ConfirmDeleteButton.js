import React, { Component } from 'react'
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types"

export default class ConfirmDeleteButton extends Component {
    constructor(props){
        super(props);
    }

    static propTypes = {
        action : PropTypes.func.isRequired
    };

    state = {
        timesPressed: 0
    }

    onPress = () => {
        const {timesPressed} = this.state;
        const { action } = this.props;
        this.setState(
            {
            timesPressed: timesPressed + 1
            },
            () => {
                if (this.state.timesPressed === 2){
                    action();
                    
                };
            }
        );
    };

    render() {
        const { timesPressed } = this.state;
        const { dialog } = this.props;
        return (
        <Button variant="dark" onClick={this.onPress} disabled={timesPressed === 2 ? true : false}>{dialog[timesPressed]}</Button>
        )
    }
}
