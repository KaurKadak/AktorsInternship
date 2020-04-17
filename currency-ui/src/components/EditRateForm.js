import React, { Component } from 'react'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/form";
import axios from "axios"

function validate(code, rate){
    return {
        rateEmpty: rate.length === 0,
    };
}

export default class EditRateForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            currencyRate : "",
        }
    }

    handleCurRateChange = e => {
        this.setState({currencyRate: e.target.value});
    };

    handleSubmit = e =>{
        if(!this.canBeSubmitted()){
            console.log("submitted here")
            e.preventDefault();
            return
        }
        
        const bodyToPass = {
            rate : this.state.currencyRate
        }

        axios.patch('http://localhost:9000/rates/'+ this.props.id, bodyToPass)
        .then(function (response) {
            //handle success
            console.log(response)

        })
        .catch(function (response) {
            //handle error
            console.log(response)
        });
    }

    canBeSubmitted(){
        const errors = validate(this.state.currencyCode, this.state.currencyRate);
        const isDisabled = Object.keys(errors).some(x => errors[x]);
        return !isDisabled
    }

    render() {
        const errors = validate(this.state.currencyCode, this.state.currencyRate);
        const isDisabled = Object.keys(errors).some(x => errors[x]);
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="currency-code">
                    <Form.Label>Currency code:</Form.Label>
                    <Form.Control type="text" placeholder={this.props.currencyCode} disabled/>
                </Form.Group>
                <Form.Group controlId="currency-rate">
                    <Form.Label>Currency rate:</Form.Label>
                    <Form.Control type="text" onChange={this.handleCurRateChange}/>
                </Form.Group>
                <Button variant="secondary" onClick={this.props.setIsOpenFalse}>
                    Close
                </Button> {" "}
                <Button variant="primary" type="submit" onClick={this.props.setIsOpenFalse} disabled={isDisabled}>
                    Submit
                </Button>
            </Form>
        )
    }
}
