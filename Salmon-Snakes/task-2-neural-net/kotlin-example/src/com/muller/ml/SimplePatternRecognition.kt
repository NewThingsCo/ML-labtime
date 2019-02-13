package com.muller.ml

fun main() {
    val network = NeuralNetwork(6)

    //pick first number
//    network.train(arrayOf(intArrayOf(1,2,4,5,4,3),intArrayOf(3,1,2,0,4,3)), arrayOf(doubleArrayOf(1.0, 0.0, 0.0, 0.0, 0.0, 0.0),doubleArrayOf(1.0, 0.0, 0.0, 0.0, 0.0, 0.0)), 50)

    //pick 3rd number
    network.train(arrayOf(intArrayOf(1,2,4,5,4,3),intArrayOf(3,1,2,0,4,3)), arrayOf(doubleArrayOf(0.0, 0.0, 1.0, 0.0, 0.0, 0.0),doubleArrayOf(0.0, 0.0, 1.0, 0.0, 0.0, 0.0)), 50)

    //pick 6th number
//    network.train(arrayOf(intArrayOf(1,2,4,5,4,1),intArrayOf(3,1,2,0,4,3)), arrayOf(doubleArrayOf(0.0, 0.0, 0.0, 0.0, 0.0, 1.0),doubleArrayOf(0.0, 0.0, 0.0, 0.0, 0.0, 1.0)), 50)


    for (i in 0 until 100) {
        println("result ${network.predict(intArrayOf(2,0,1,3,4,5))}")
    }

}