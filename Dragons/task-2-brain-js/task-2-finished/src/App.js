import React, { Component } from 'react';
import './App.css';
import {execute, startTraining} from "./utils/brain";

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      input: "",
      result: "",
      testDisabled: true
    }
  }

  render() {
    const self = this;

    function fireStartTraining(event) {
      if(event !== undefined) event.preventDefault();
      startTraining();
      self.setState({
        ...self.state,
        testDisabled: false
      })
    }

    function registerInput(event) {
      if(event !== undefined) event.preventDefault();

      let input = event.target.value;
      self.setState({
        ...self.state,
        input: input
      })
    }

    function testThatTweet(event){
      if(event !== undefined) event.preventDefault();
      if(self.state.input !== ""){
        self.setState({
          ...self.state,
          result:         execute(self.state.input)
        })
      }
    }

    const {result, testDisabled} = this.state;

    return (
      <div className="App">
        <button onClick={fireStartTraining}>Train model</button>
        <p>{testDisabled ? "Train model first!" : "Test That Tweet!"}</p>
        <input type="text" onChange={registerInput} disabled={testDisabled} />
        <button onClick={testThatTweet} disabled={testDisabled}>Test</button>
        <p>{result}</p>
      </div>
    );
  }
}

export default App;
