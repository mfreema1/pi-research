import requests
import csv

json = []
with open('output.csv', 'r') as f:
    for row in csv.DictReader(f):
        json.append(row)
requests.post('http://52.55.77.214:3000/entries', timeout=10, json=json)
