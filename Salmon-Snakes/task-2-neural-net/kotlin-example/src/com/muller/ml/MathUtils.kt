package com.muller.ml


object MathUtils {
    fun sigmoid(x: Double): Double {
        return 1 / (1 + Math.exp(-x))
    }
}