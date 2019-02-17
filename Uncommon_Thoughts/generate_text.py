# import keras
from keras.models import load_model
import json
from nltk.tokenize import word_tokenize
import numpy as np
import random
# import sys
import pandas as pd

model = load_model('../my_model.h5')


def sample(preds, temperature=1.0):
    """
    Compute new probability distribution based on the temperature
    Higher temperature creates more randomness.

    :param preds: numpy array of shape (unique chars,), and elements sum to 1
    :type  preds: numpy.ndarray
    :param temperature: characterizes the entropy of probability distribution
    :type  temperature: float
    :returns: a number 0 to the length of preds - 1
    :rtype:   int
    """

    preds = np.asarray(preds).astype('float64')
    preds = np.log(preds) / temperature
    exp_preds = np.exp(preds)
    preds = exp_preds / np.sum(exp_preds)
    probas = np.random.multinomial(1, preds, 1)
    return np.argmax(probas)


def text_generate(model, text, word_indices, maxlen=10, temperature=1.0, textlen=40):
    """
    Generate text based on a model.

    :param model: trained keras model
    :type  model: keras.engine.sequential.Sequential
    :param text: lyrics
    :type  text: str
    :param char_indices: dictionary mapping a character to its integer placeholder
    :type  char_indices: dict
    :param maxlen: maximum length of the sequences
    :type  maxlen: int
    :param textlen: Number of characters of generated sequence
    :type  textlen: int
    """

    start_index = random.randint(0, len(text) - maxlen - 1)
    generated_text = text[start_index: start_index + maxlen]
    full_sentence = " ".join(generated_text)

    out_text = generated_text

    for i in range(textlen):

        sampled = []
        for t, word in enumerate(generated_text):
            word_dimensions = list(wordvectors_mini[word])
            sampled.append(word_dimensions)
        sampled = np.array(sampled)
        sampled = np.reshape(sampled, (1,) + sampled.shape)

        preds = model.predict(sampled, verbose=0)[0]
        next_index = sample(preds, temperature)
        next_index = str(next_index)
        next_word = word_indices[next_index]

        generated_text.append(next_word)
        generated_text = generated_text[1:]
        out_text.append(next_word)
    return out_text



def find_random_sentence(tokens, word, maxlen):
    list_of_appearance = np.where(np.array(tokens) == word)[0]
    stop_characters = set({'...', '.', '?', '!'})
    random_index = random.choice(list_of_appearance)
    index = random_index

    sentence = []
    while (tokens[index] not in stop_characters):
        sentence.append(tokens[index])
        index += 1
    sentence.append(tokens[index])

    index = random_index

    while ((tokens[index] not in stop_characters) or len(sentence) < 11):
        sentence.insert(0, tokens[index])
        index -= 1

    return sentence[:maxlen]


def text_generate_with_word(
        model,
        text,
        word_indices,
        word,
        maxlen=10,
        temperature=1.0,
        textlen=40):
    """
    Generate text based on a model.
    The starting seed is based on a word input 

    :param model: trained keras model
    :type  model: keras.engine.sequential.Sequential
    :param text: lyrics
    :type  text: str
    :param char_indices: dictionary mapping a character to its integer placeholder
    :type  char_indices: dict
    :param word: the input starting word
    :type  word: str
    :param maxlen: maximum length of the sequences
    :type  maxlen: int
    :param textlen: Number of characters of generated sequence
    :type  textlen: int
    """

    stop_characters = set({'...', '.', '?', '!'})

    generated_text = find_random_sentence(tokens, word, maxlen)
    full_sentence = " ".join(generated_text)

    out_text = generated_text

#     for i in range(textlen):
    stop_generate = False
    i = 0
    while ((i < textlen) or (not stop_generate)):

        sampled = []
        for t, word in enumerate(generated_text):
            word_dimensions = list(wordvectors_mini[word])
            sampled.append(word_dimensions)
        sampled = np.array(sampled)
        sampled = np.reshape(sampled, (1,) + sampled.shape)

        preds = model.predict(sampled, verbose=0)[0]
        next_index = sample(preds, temperature)
        next_index = str(next_index)
        next_word = word_indices[next_index]

        generated_text.append(next_word)
        generated_text = generated_text[1:]
        out_text.append(next_word)

        if (next_word in stop_characters):
            stop_generate = True
        i += 1
    return out_text


# change this so I download the text after making this changes, so I can just upload th
# updated text
# actually, change it so 
import re
text = open('../all.txt', 'r').read()
text = text.lower()
text = re.sub(r'[*^$%&()@#-+_=//]', ' ', text)
text = re.sub(" \d+", "number", text)
text = re.sub(r'http\S+', ' ', text)


tokens = word_tokenize(text)
with open('../mapping.json') as infile:
    word_indices = json.load(infile)

with open('../wordvectors_mini.json') as infile:
    wordvectors_mini = json.load(infile)

def gen_text(word):
    try: 
        sentence = text_generate_with_word(
            model, tokens, word_indices, word, maxlen=20
        )
        final_text = ' '.join(sentence)
    except ValueError:
        sentence = text_generate(model, tokens, word_indices, maxlen=20)
        final_text = ' '.join (sentence)
    except KeyError:
        gen_text()
    return final_text