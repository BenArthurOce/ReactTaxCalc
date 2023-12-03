import React, { Component } from 'react';
import axios from 'axios';
import TaxFrontend from './TaxFrontend.js';
import TaxForm from './TaxForm.js';

class App extends Component {
  state = {
    data: null
  };


  render() {
    return <TaxFrontend />;
  }
}

export default App;