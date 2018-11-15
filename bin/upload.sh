#!/bin/bash
# Upload contents of the file
python3 $HOME/bin/upload.py

# Delete contents of file to make room for more readings
echo "datetime,humidity,fahrenheit,pressure" > $HOME/bin/output.csv
