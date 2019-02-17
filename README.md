# Alexa Play Uncommon Thoughts

Whats the best time for creativity? In the shower of course. Our project hopes to inspire this. With this new Alexa feature, we will bring provide you the inspiration that you need to spark your creativity!


# Goals:

1. Scrape data from Reddit shower thoughts.
2. Create a neural network that can generate shower thoughts.
3. Integrate with Amazon Alexa to spit out generated text.

# Procedures


## Scraping Reddit 

Data is collected through Reddit's API. We scraped data from: https://www.reddit.com/r/Showerthoughts/.

## Recurrent Neural Network

We built a recurrent neural network that uses the scraped Reddit posts as scraped data. Then we generated new text.

1. Create the input train set and labels with the scraped data.
2. Convert words into vectors.
3. Feed train data through two layers of GRU to train the weights.
4. Feed a seed to the neural network and predict a probability distribution over the possible words that might come after the seed.
5. Pick a word based on the probability distribution.

## Ask Alexa

We used AWS lambda to ask users for a keyword that would be used to generate a random, uncommon thought.

1. Create Alexa skill with appropriate intents and slot values.
2. Have Alexa call the text generator with the user's keyword.
3. Naturally repeat the sentence back to the user.
 
Things I need to do:
preprocess the text (remove numbers and special characters)

## Example

<audio controls preload> 
    <source src="https://github.com/JinLi711/SubReddit-Generator/blob/master/UT.mp3"> </source>  
</audio>

