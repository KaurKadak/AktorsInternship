import React, { Component} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/form";
import axios from "axios"
var validateCurrencyCode = require('validate-currency-code');
var currencyInformation = require('currency-codes');

function validate(code, rate){
    return {
        codeEmpty: code.length === 0,
        rate: rate.length === 0,
        codeValid: !validateCurrencyCode(code)
    };
}

export class AddRateForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            currencyCode : "",
            currencyRate : "",
            currencyFullName: "",
        }

    }

    handleCurCodeChange = e => {
        this.setState({currencyCode: e.target.value});
    };

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
            code : this.state.currencyCode,
            fullName : currencyInformation.code(this.state.currencyCode).currency,
            rate : this.state.currencyRate
        }

        axios.post('http://localhost:9000/rates',bodyToPass)
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
            <div>
                
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="currency-code">
                            <Form.Label>Currency code:</Form.Label>
                            <Form.Control type="text"  placeholder="Enter valid currency code in UPPPERCASE" onChange={this.handleCurCodeChange}/>
                        </Form.Group>
                        <Form.Group controlId="currency-code">
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
                   
                
            </div>
        )
    }
}

export default AddRateForm
