import praw
import json
from praw.models import MoreComments

reddit = praw.Reddit(client_id='DFv008_q4N3hiQ', client_secret='vA0dVBIxydeISNdEJ9yA0UIL58g', user_agent='cool by /u/BottyMcBotFace123')

shower = reddit.subreddit('ShowerThoughts')

textFile = open("thoughts.json", "w")

textFile.write('[')

maxLimit = 1000
counter = 0

for post in shower.top(limit=maxLimit):
  counter += 1
  print("Processing post " + str(counter) + "/" + str(maxLimit))
  newPost = { 
    'title': post.title,
    'text': post.selftext
  }
  json.dump(newPost, textFile)
  textFile.write(',\n')
  # i = 0
  # for comment in post.comments:
  #   i += 1
  #   if i > 3:
  #     continue
  #  if isinstance(comment, MoreComments):
  #    continue
  #  newComment = {
  #    'comment': comment.body
  #  }
  #  json.dump(newComment, textFile)
  #  textFile.write(',\n')

textFile.write(']')

