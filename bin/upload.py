import requests
import csv
import os

json = []
with open('/home/pi/pi-research/bin/output.csv', 'r') as f:
    for row in csv.DictReader(f):
        json.append(row)
    try:
        requests.post('http://mallard.stevens.edu:3000/entries', timeout=5, json=json)
    except: #forgive me
        print('Could not reach mother duck')
        with open('/home/pi/pi-research/bin/archive.csv', 'a') as o:
            for line in f:
                o.write(line)
