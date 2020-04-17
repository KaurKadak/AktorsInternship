import React, { Component } from 'react';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ConfirmDeleteBtn from "./ConfirmDeleteButton";
import EditRateForm from "./EditRateForm";
import Modal from "react-bootstrap/modal";
import axios from "axios";


export class CurrencyRateSingle extends Component {
    constructor(props){
        super(props);
       
    }

    state = {
        isOpen: false
    };

    showModal = () => {this.setState({isOpen: true})}
    hideModal = () => {this.setState({isOpen: false})}

    editRate(){

    }

    deleteRate(){
        axios({
            method: "DELETE",
            url: 'http://localhost:9000/rates/'+ this.props.currency.id,
        })
        .then(function (response) {
            
            console.log(response)

        })
        .catch(function (response) {
            //handle error
            console.log(response)
        });
        window.location.reload(false);
    }



    render() {
        return (
            <div>

                <Card style={{ 
                    width: '18rem',
                    margin: '1rem'
                }}>
                <Card.Body>
                    <Card.Title>{this.props.currency.fullName}</Card.Title>
                    <Card.Text>1 EUR : {this.props.currency.rate} {this.props.currency.code}</Card.Text>
                    <Button variant="dark" onClick={this.showModal}>Edit</Button>{" "}
                    <ConfirmDeleteBtn dialog = {["Delete", "Are you sure?", "Deleted, refreshing page"]} action={() => this.deleteRate()} />

                    <Modal show={this.state.isOpen} onHide={this.hideModal}>
                        <Modal.Header closeButton>
                        <Modal.Title>Edit Rate</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <EditRateForm currencyCode={this.props.currency.code} setIsOpenFalse={this.hideModal} id={this.props.currency.id}/>
                        </Modal.Body>
                    
                    </Modal>

                </Card.Body>
                </Card>
            </div>
        )
    }
}

export default CurrencyRateSingle
