import React, {Component} from 'react'
import './App.css'
import {execute, startTraining} from "./utils/brain"
import {trainingData} from "./data/training-data"
import {Player, MusicRNN, MusicVAE, sequences, midiToSequenceProto, sequenceProtoToMidi} from '@magenta/music'


class App extends Component {
    constructor(props) {
        super(props)

        const audioContext = new (window.AudioContext || window.webkitAudioContext)()
        const player = new Player()

        this.state = {
            input: "",
            result: "",
            testDisabled: true,
            audioContext: audioContext,
            player: player
        }
    }

    render() {
        const self = this
        const {result, testDisabled} = self.state

        function fireStartTraining(event) {
            if (event !== undefined) event.preventDefault()
            startTraining()
            self.setState({
                ...self.state,
                testDisabled: false
            })
        }

        function registerInput(event) {
            if (event !== undefined) event.preventDefault()

            let input = event.target.value
            self.setState({
                ...self.state,
                input: input
            })
        }

        function testThatTweet(event) {
            if (event !== undefined) event.preventDefault()
            if (self.state.input !== "") {
                self.setState({
                    ...self.state,
                    result: execute(self.state.input)
                })
            }
        }

        function addToTrainingData(event) {
            if (event !== undefined) event.preventDefault()


            trainingData.push({
                input: self.state.input,
                output: self.state.result.output
            })

            self.setState({
                ...self.state,
                testDisabled: true
            })

            fireStartTraining(event)
        }

        function startPlayingMusic(event) {
            event.preventDefault()
            const {result, audioContext} = self.state

            audioContext.resume().then(
                function () {
                    // Do fun music here
                    if(result.output.trump){
                        playWithRnn(result.certainty)
                    }
                    else{
                        playWithVae(result.certainty )
                    }
                })
        }

        function playWithVae(sampleCount) {
            const music_vae = new MusicVAE('https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/mel_16bar_small_q2')

            const {player} = self.state

            console.log("attempting to intialize model")
            music_vae.initialize().then(
                function () {
                        if (player.isPlaying()) {
                            player.stop()
                        }

                        const temperature = 100 - sampleCount // the more certain the less variance
                        music_vae
                            .sample(sampleCount, temperature, null, 4, 120)
                            .then((sample) => {
                                console.log("attempting to play sample")

                                player.start(sample[0])
                            })

                        player.stop()
                })
        }

        function createNoteSequenceFromInputText(certainty) {

            function calculatePitch(initial, certainty){
                return (initial + certainty) / 2
            }

            return {
                notes: [
                    {pitch: calculatePitch(60 , certainty), startTime: 0.0, endTime: 0.5},
                    {pitch: calculatePitch(60 , certainty), startTime: 0.5, endTime: 1.0},
                    {pitch: calculatePitch(67 , certainty), startTime: 1.0, endTime: 1.5},
                    {pitch: calculatePitch(67 , certainty), startTime: 1.5, endTime: 2.0},
                    {pitch: calculatePitch(69 , certainty), startTime: 2.0, endTime: 2.5},
                    {pitch: calculatePitch(69 , certainty), startTime: 2.5, endTime: 3.0},
                    {pitch: calculatePitch(67 , certainty), startTime: 3.0, endTime: 4.0},
                    {pitch: calculatePitch(65 , certainty), startTime: 4.0, endTime: 4.5},
                    {pitch: calculatePitch(65 , certainty), startTime: 4.5, endTime: 5.0},
                    {pitch: calculatePitch(64 , certainty), startTime: 5.0, endTime: 5.5},
                    {pitch: calculatePitch(64 , certainty), startTime: 5.5, endTime: 6.0},
                    {pitch: calculatePitch(62 , certainty), startTime: 6.0, endTime: 6.5},
                    {pitch: calculatePitch(62 , certainty), startTime: 6.5, endTime: 7.0},
                    {pitch: calculatePitch(60 , certainty), startTime: 7.0, endTime: 8.0},
                ],
                totalTime: 8
            }
        }

        function playWithRnn(certainty) {
            const {player} = self.state
            const tune = createNoteSequenceFromInputText(certainty)

            const music_rnn = new MusicRNN('https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/basic_rnn')

            music_rnn.initialize().then(function(){
                if(player.isPlaying()){
                    player.stop()
                }

                const qns = sequences.quantizeNoteSequence(tune, 4)
                const rnn_steps = 200
                const rnn_temperature = 2.5
                music_rnn
                    .continueSequence(qns, rnn_steps, rnn_temperature)
                    .then((sample) => player.start(sample))

                player.stop()

            })

        }

        return (
            <div className="App">
                <button onClick={fireStartTraining}>Train model</button>
                <p>{testDisabled ? "Train model first!" : "Test That Tweet!"}</p>
                <input type="text" onChange={registerInput} disabled={testDisabled}/>
                <button onClick={testThatTweet} disabled={testDisabled}>Test</button>
                <p>{result.input}</p>
                <p>{result.text}</p>
                <button onClick={addToTrainingData} disabled={testDisabled}>Add to training data</button>
                <p>Turn the certainty into music!</p>
                <button onClick={startPlayingMusic} disabled={testDisabled}>Play</button>
            </div>
        )
    }
}

export default App
