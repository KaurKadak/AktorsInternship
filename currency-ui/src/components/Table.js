import React, {useState} from "react";
import SingleCurrencyItem from "./CurrencyRateSingle";
import Form from "./AddRateForm"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"

import "../App.css";


function Table(props) {

    const [isOpen, setIsOpen] = useState(false)

    const setIsOpenTrue = () => setIsOpen(true)
    const setIsOpenFalse = () => setIsOpen(false)

    return (
        <div>
            <div className="flex">
                {props.currencyData.map(currency => (<SingleCurrencyItem key={currency.id} currency={currency}/>))}
            </div>
            
            <Button variant="dark"  style={{float:"right", margin: "2rem"}} size="lg" onClick={setIsOpenTrue}>Add rate</Button>

            <Modal show={isOpen} onHide={setIsOpenFalse}>
                <Modal.Header closeButton>
                <Modal.Title>Add new rate</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form setIsOpenTrue={setIsOpenTrue} setIsOpenFalse={setIsOpenFalse}/>
                </Modal.Body>
               
            </Modal>
            
            
        </div>
     )
}

export default Table