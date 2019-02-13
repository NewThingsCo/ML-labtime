import React, { Component } from 'react';
import './App.css';
import {execute, startTraining} from "./utils/brain";
import {trainingData} from "./data/training-data";
import {Player} from '@magenta/music'



class App extends Component {
  constructor(props){
    super(props)

    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const player = new Player();

    this.state = {
      input: "",
      result: "",
      testDisabled: true,
      audioContext : audioContext,
      player : player
    }
  }

  render() {
    const self = this
    const {result, testDisabled} = self.state

    function fireStartTraining(event) {
      if(event !== undefined) event.preventDefault();
      startTraining()
      self.setState({
        ...self.state,
        testDisabled: false
      })
    }

    function registerInput(event) {
      if(event !== undefined) event.preventDefault()

      let input = event.target.value
      self.setState({
        ...self.state,
        input: input
      })
    }

    function testThatTweet(event){
      if(event !== undefined) event.preventDefault()
      if(self.state.input !== ""){
        self.setState({
          ...self.state,
          result:         execute(self.state.input)
        })
      }
    }

    function addToTrainingData(event){
      if(event !== undefined) event.preventDefault()


      trainingData.push({
        input: self.state.input,
        output: self.state.result.output
      })

      self.setState({
        ...self.state,
        testDisabled : true
      })

      fireStartTraining(event)
    }

    function startPlayingMusic(event) {
      self.state.audioContext.resume().then({
          // Do fun music here
      })
    }

    return (
      <div className="App">
        <button onClick={fireStartTraining}>Train model</button>
        <p>{testDisabled ? "Train model first!" : "Test That Tweet!"}</p>
        <input type="text" onChange={registerInput} disabled={testDisabled} />
        <button onClick={testThatTweet} disabled={testDisabled}>Test</button>
        <p>{result.input}</p>
        <p>{result.text}</p>
        <button onClick={addToTrainingData} disabled={testDisabled}>Add to training data</button>
      </div>
    )
  }
}

export default App
