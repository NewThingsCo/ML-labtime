# Task 2 - How to train your dragon

## Initial setup
Clone the base repo, this has a basic React app so you dont need to fiddle with that

```
git clone https://github.com/mikefynes-newthings/ML-labtime.git
```

## Training data setup
In any ML setup the data is crucial, BrainJS can handle an array of data, as long as it is represented as a number between 0 and 1, for example

```
{
    Input: { r: 0.03, g: 0.7, b: 0.5 },
    Output: { black: 1 }
}
```

This would train the model that when it sees a similar pattern, it should output `black`

Luckily there are many ways of converting almost any data to numbers and you can one or come up with your own.

See data-utils.js for examples that allow you to turn text to numbers, images to numbers, or MIDI to numbers.

For now we can also use our pre-prepared data in `training-data.js`

```
{
    input: "Fashion Week is so much fun in the #KimKardashianGame! I'd love to see what you're wearing! http://smarturl.it/PlayKKH",
    output: { kardashian: 1 }
},{
    input: "'Congressman Schiff omitted and distorted key facts' @FoxNews  So, what else is new. He is a total phony!",
    output: { trump: 1 }
}
```

Here we take two tweets, and categorise them by who sent them, if we have enough data we should be able to enter any tweet and the model will tell us likelyhood that it was sent by Trump or Kardashian.

## Training the model
The model works in a very simple way, simply create it, then run it
```
function train(data) {
    const net = new NeuralNetwork();
    net.train(processTrainingData(data));
    trainedNet = net.toFunction();
}

function encode(arg){
    return arg.split('').map(x => (x.charCodeAt(0) / 255));
}

function processTrainingData(data) {
    return data.map(d => {
        return {
            input: encode(d.input),
            output: d.output
        }
    })
}
```

This allows us to take any text, of any length, and convert it into something the network can use.

## Testing!
So, we have our layout, we can train our model, now its time to find a tweet and test the model.

``` 
We are fighting for all Americans, from all backgrounds, of every age, race, religion, birthplace, color & creed. Our agenda is NOT a partisan agenda – it is the mainstream, common sense agenda of the American People. Thank you El Paso, Texas - I love you!
```

What does the model say?