## Build your own neural network

We're going to build a neural network in a language of your choice.
We will try to teach the network to choose the right number from our array by index. First we will train it with an training data and then we are going to ask it to predict the correct number from other input

A small example to make it more clear:
```javascript
var network = NeuralNetwork(4) //4 = neuronCount

var trainingInput = [[1,0,4,5], [5,4,3,2], [6,9,2,8]]
var trainingOutput = [[1.0, 0.0, 0.0, 0.0], [1.0, 0.0, 0.0, 0.0], [1.0, 0.0, 0.0, 0.0]]

var iterations = 500
neuralNetwork.train(trainingInput, trainingOutput, iterations)

int[] testInput = [8,3,0,4]
var result = neuralNetwork.predict(testInput)

//result should be 8 (we tried to teach the network to always pick the first number)
```
###
#### Short introduction
What should a Neural network do from a high-level perspective?
It should to be able to be trained with provided data and answers, so it can learn from that, and we need to be able to test it, or have it predict an outcome.

To do this we will be implementing the following interface:
````Java
interface NeuralNet {
    void train(trainingData, answers, iterations);
    int predict(testInput);
}
````

The network will consist of a two layers (input & output). We start by assigning random weights to the neurons in the output layer.
To train the network we loop through the supplied inputs and use these to calculate the dot product of the input value and the (random) weights in the output layer.
We run the dot product through a sigmoid function and get a value, which we then substract from the expected output weight. Finally, we use the remaining value to adjust the weights in the output layer, we do this by simply adding the value to the weight.

This could look something like this
```javascript
for (i in trainingInput.length) {
    val input = trainingInput[i]
    val output = expectedOutput[i]

    for (j in neurons.length) {
        val delta = output[j] - sigmoid(dot(neurons[j], input))
        neurons[j].adjustWeights(input, delta)
    }}
```


To predict a result, we want to run our input through the already existing layers and weights. Since we only have a single layer thats not the input, we run our new input through the output layer that's already in place and already has it's trained weights. We then see which of the weights has the highest value, and take the index of that weight and return the value with the same index from the supplied input.

This could look like this:
```javascript
val outputs = neurons.map { sigmoid(dot(it, input)) }

var index = 0

//get the index with the highest weight value
for (i in 0 until outputs.size) {
    if (outputs[i] > outputs[index])
        index = i
}

return input[index]
```

The sigmoid function essentially takes an input and returns a value between 0 and 1.
The lower the value, the closer to 0, the higher the value, the closer to 1.

Sigmoid function
```javascript
fun sigmoid(x: Double): Double {
    return 1 / (1 + Math.exp(-x))
}
````

###

##### More information
Interesting video series explaining (multi-layered) neural networks and the math behind it: 
https://www.youtube.com/watch?v=aircAruvnKk

Google crash course on machine learning:
https://developers.google.com/machine-learning/crash-course/

Backpropogation:
 https://medium.com/@14prakash/back-propagation-is-very-simple-who-made-it-complicated-97b794c97e5c

