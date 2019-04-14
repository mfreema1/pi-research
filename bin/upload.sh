#!/bin/bash
# Upload contents of the file
python3 $HOME/pi-research/bin/upload.py

# Delete contents of file to make room for more readings
echo "datetime,humidity,fahrenheit,pressure,gas,rp_id" > $HOME/pi-research/bin/output.csv
