import React, { Component } from 'react';
import axios from 'axios';
import TaxFrontend from './TaxFrontend.js';
import TaxForm from './TaxForm.js';
import './App.css';



class App extends Component {
  state = {
    data: null
  };


  render() {
    return <TaxFrontend />;
  }
}

export default App;
