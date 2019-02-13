# Task 3 - Re-training your Salmon Snake

# Objective
Add a method to re-train your model on the fly, automate, add a new node, or create a manual step to make this possible

# Feedback

Feedback is critical in any ML application, but how do you turn Assfeeling to RoboFeeling?

In the task 2 Trump tweet it is simple enough to determine which is the "correct" answer if the model gets it wrong.

## Brute force training
The simplest, least nuanced, method of giving feedback is to re-feed correct answers into the model, this can be done by adding a "Yes/No" button and appending the correct answer with the tweet to the training data before re-running the model over it.

## Ideal training
In an ideal world, the testing insights would be used to adjust the internal weights which would allow the model to learn the "correct" answer faster.

# Objective
Add a method to re-train your model on the fly, automate, add a new node, or create a manual step to make this possible