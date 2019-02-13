package com.muller.ml

class NeuralNetwork(neuronCount: Int) : NeuralNet {
    private val neurons: ArrayList<Neuron> = ArrayList()

    init {
        for (i in 0 until neuronCount)
            neurons.add(Neuron(neuronCount))
    }

    override fun train(trainingInput: Array<IntArray>, expectedOutput: Array<DoubleArray>, iterations: Int) {
        for (i in 0 until iterations) {
            for (j in trainingInput.indices) {
                val input = trainingInput[j]
                val output = expectedOutput[j]

                for (k in neurons.indices) {
                    val delta = output[k] - neurons[k].calculateWeight(input)
                    neurons[k].adjustWeights(delta)
                }
            }
        }
    }

    override fun predict(input: IntArray): Int {
        val outputs = neurons.map { it.calculateWeight(input) }.toList()

        var index = 0

        for (i in 0 until outputs.size) {
            if (outputs[i] > outputs[index])
                index = i
        }

        println("Weights: [${outputs.joinToString()}]")

        return input[index]
    }
}

class Neuron(weightCount: Int) {
    private val weights: ArrayList<Double> = ArrayList()

    init {
        for (i in 0 until weightCount) {
            weights.add(Math.random())
        }
    }

    fun calculateWeight(input: IntArray) : Double {
        var sum = 0.0

        for (i in input.indices) {
            sum += input[i] * weights[i]
        }

        return MathUtils.sigmoid(sum)
    }

    fun adjustWeights(delta: Double) {
        for (i in weights.indices) {
            weights[i] += delta
        }
    }
}