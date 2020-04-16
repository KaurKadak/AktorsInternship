import React, { Component } from 'react'
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
export class CurrencyRateSingle extends Component {

    editRate(){
        
    }

    deleteRate(){

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
                    <Button variant="dark">Edit rate</Button>{" "}
                    <Button variant="dark">Delete rate</Button>
                </Card.Body>
                </Card>
                
                {/* <button className="button">Delete rate</button>
                <button className="button">Edit rate</button>    */}
            </div>
        )
    }
}

export default CurrencyRateSingle
