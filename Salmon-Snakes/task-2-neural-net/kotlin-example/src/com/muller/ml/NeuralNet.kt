package com.muller.ml

interface NeuralNet {
    fun train(trainingInput: Array<IntArray>, expectedOutput: Array<DoubleArray>, iterations: Int)
    fun predict(input: IntArray): Int
}