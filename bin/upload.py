from shutil import copyfile
import requests
import csv

json = []
with open('/home/pi/pi-research/bin/output.csv', 'r') as f:
    for row in csv.DictReader(f):
        json.append(row)
    try:
        requests.post('http://mallard.stevens.edu:3000/entries', timeout=5, json=json)
    except: #forgive me
        with open('/home/pi/pi-research/bin/archive.csv', 'a') as o:
            f.seek(0)
            next(f) #skip headers
            for line in f:
                o.write(line)
