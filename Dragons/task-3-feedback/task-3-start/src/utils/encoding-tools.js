

/*
Brain JS requires data to be "encoded" as a value between 0 and 1, this means we can use extended ASCII to parse text, or use normalised RGB values from images
 */

export function encodeText(arg){
    return arg.split('').map(x => (x.charCodeAt(0) / 255));
}

export function processTrainingData(data) {
    return data.map(d => {
        // Expected input "String of text"
        return {
            input: encodeText(d.input),
            output: d.output
        }
    })
}

export function processTrainingDataRGB(data){
    return data.map(d => {
        // Expected input an array of numbers between 0 and 1 [0.2, 0.3, 0.1]
            return {
                input: d.input,
                output: d.output
            }
        })
}