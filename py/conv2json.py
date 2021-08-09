import os
import csv
import json

result = []
with open('./dataset.csv', 'rt') as f:
    cf = csv.DictReader(f)
    for i in cf:
        if len(i['no'].strip()):
            result.append(i)

with open('../src/utils/dataset.json', 'wt') as f:
    f.write(json.dumps(result))


