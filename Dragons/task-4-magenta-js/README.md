# Task 4 - Play that funky music

This is where we actually start making sweet sweet music

## Connecting Brain to Heart
We will be usign MagentaJS to produce the actual music, it has two options, and we will implement basic versions of both

### RNN
A Recurrent Neural Network, the "classic" neural network setup, this implementation is a "continuer", you pass it some notes, it continues as best it can, we will be using the outputs from the previous tasks to generate the notes for this tool, a note sequence looks like the below

```
        const TWINKLE_TWINKLE = {
            notes: [
                {pitch: 60, startTime: 0.0, endTime: 0.5},
                {pitch: 60, startTime: 0.5, endTime: 1.0},
                {pitch: 67, startTime: 1.0, endTime: 1.5},
                {pitch: 67, startTime: 1.5, endTime: 2.0},
                {pitch: 69, startTime: 2.0, endTime: 2.5},
                {pitch: 69, startTime: 2.5, endTime: 3.0},
                {pitch: 67, startTime: 3.0, endTime: 4.0},
                {pitch: 65, startTime: 4.0, endTime: 4.5},
                {pitch: 65, startTime: 4.5, endTime: 5.0},
                {pitch: 64, startTime: 5.0, endTime: 5.5},
                {pitch: 64, startTime: 5.5, endTime: 6.0},
                {pitch: 62, startTime: 6.0, endTime: 6.5},
                {pitch: 62, startTime: 6.5, endTime: 7.0},
                {pitch: 60, startTime: 7.0, endTime: 8.0},
            ],
            totalTime: 8
        }
```

This is the note sequence for Twinkle Twinkle little star, we wont be using this, hopefully, but its a good way to test the setup works as expected

### VAE
A Variable Auto Encoder, this is a "interpolator" tool which can take two note sequences and attempt to create new music incorporating both styles.

It takes as input `sample count` variable, which is any whole number greater than zero, a `temperature` variable, which tells the model how far from origin it can go, a `chord progression` variable, which is better explained here : https://blog.landr.com/chord-progressions/ , `steps per quarter`, and finally, the `qpm` or quarters per minute, which defines the tempo

at its simplest it can be set up to run with the below code

```
music_vae
  .sample(1, 1, null, 4, 120)
  .then((sample) => vaePlayer.start(sample[0]));
```

This uses the models default chord progression
