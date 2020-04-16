import React, { Component } from "react";
import "./App.css";

import Table from "./components/Table";
import axios from "axios";

class App extends Component {

  state = {
    currencyData : [],
    buttonText : String
  }

  // Get rates
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
        <Table currencyData={this.state.currencyData}/>
      </div>
    );
  }
}

export default App;
