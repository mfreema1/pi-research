import requests
from csv import DictReader

json = []

file = DictReader(open('output.csv'))
for row in file:
    json.append(row)

requests.post('http://192.168.1.200:3000', timeout=10, json=json)
