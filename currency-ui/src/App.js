import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";

class App extends Component {

  state = {
    currencyData: []
  };

  componentDidMount(){
    axios
    .get("http://localhost:9000/rates")
    .then(res => {
      const newRates = res.data.map(r => {
        return{
          id: r._id,
          code: r.code,
          fullName: r.fullName,
          rate: r.rate
        };
      });

      const newState = Object.assign({}, this.state, {
        currencyData: newRates
      });

      this.setState(newState);
    })
    .catch(err => console.log(err));

  }
 
  render(){
    return (
      <div className="page">
        <h1 className="page_title">Currency Rates</h1>
        <button onClick={console.log(this.state.currencyData)}>Click me</button>
      </div>
    );
  }
}

export default App;
