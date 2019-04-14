import board
import busio
import adafruit_bme680
import os
from datetime import datetime
i2c = busio.I2C(board.SCL, board.SDA)
sensor = adafruit_bme680.Adafruit_BME680_I2C(i2c)

hPa_to_atm = 1013.2501

out = []
out.append(datetime.now().strftime('%Y-%m-%d %H:%M:%S'))
out.append('{:.3f}'.format(sensor.humidity))
out.append('{:.3f}'.format(sensor.temperature * 1.8 + 32))
out.append('{:.3f}'.format(sensor.pressure / hPa_to_atm))
out.append('{:.3f}'.format(sensor.gas))

if('RP_ID' in os.environ):
    out.append(os.environ['RP_ID'])
else:
    out.append('NA')

print(','.join(out))
