import redis
import json

r = redis.Redis(host='localhost', port=6379, db=0)

db = open('post.txt','w')

for key in r.scan_iter("post:*"):
    db.write(r.get(key).decode('utf-8') + "\n")

db.close()

db = open('all.txt', 'w')

for key in r.scan_iter():
    db.write(r.get(key).decode('utf-8') + "\n")

db.close()
