import React, { Component } from 'react';
import './App.css';
import {execute, startTraining} from "./utils/brain";

class App extends Component {
  constructor(props){
    super(props)

    this.state = {}
  }

  render() {
    return (
      <div className="App">
        <div>Build your beauty here!</div>
      </div>
    );
  }
}

export default App;
