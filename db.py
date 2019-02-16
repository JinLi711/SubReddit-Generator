import praw
import json
import redis
from praw.models import MoreComments

r = redis.Redis(host='localhost', port=6379, db=0)

reddit = praw.Reddit(client_id='DFv008_q4N3hiQ', client_secret='vA0dVBIxydeISNdEJ9yA0UIL58g', user_agent='cool by /u/BottyMcBotFace123')

shower = reddit.subreddit('ShowerThoughts')

#textFile = open("other_thoughts.json", "w")

#textFile.write('[')

counter = 0

print("Processing top posts")

MAX_LIMIT = 10000

def clean(s):
  return s.replace("\n", " ").replace("'", "").replace("\"","")

for post in shower.top('all', limit=MAX_LIMIT):
  counter += 1
  if counter % 100 == 0:
    print("Processed " + str(counter) + " posts")
  r.set("post:"+post.id, clean(post.title))
  i = 0
  for comment in post.comments:
    i += 1
    if i > 5:
        break
    if isinstance(comment, MoreComments):
      continue
    r.set("comment:"+comment.id, clean(comment.body))

print(str(counter) + " top posts")

for post in shower.hot(limit=MAX_LIMIT):
  counter += 1
  if counter % 100 == 0:
    print("Processed " + str(counter) + " posts")
  r.set("post:" + post.id, clean(post.title))
  i = 0
  for comment in post.comments:
    i += 1
    if i > 5:
        break
    if isinstance(comment, MoreComments):
      continue
    r.set("comment:"+comment.id, clean(comment.body))

print("Processing stream posts")

for post in shower.stream.submissions():
  counter += 1
  if counter % 100 == 0:
    print("Processed " + str(counter) + " posts")
  r.set("stream:" + post.id, post.title)

print("Done processing " + str(counter) + " posts")
