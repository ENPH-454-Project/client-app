import time
import os
import RPi.GPIO as GPIO
import numpy as np
import matplotlib.pyplot as plt
import pyaudio
import wave
import sys
import math
from scipy.io.wavfile import read, write

GPIO.setmode(GPIO.BCM)
DEBUG = 1

data=np.array([])
p = pyaudio.PyAudio()
freq = 440
bitrate = 44100
stream = p.open(format=p.get_format_from_width(1),
                channels=1,
                rate=bitrate,
                output=True)
# read SPI data from MCP3008 chip, 8 possible adc's (0 thru 7)
def readadc(adcnum, clockpin, mosipin, misopin, cspin):
        if ((adcnum > 7) or (adcnum < 0)):
                return -1
        GPIO.output(cspin, True)

        GPIO.output(clockpin, False)  # start clock low
        GPIO.output(cspin, False)     # bring CS low

        commandout = adcnum
        commandout |= 0x18  # start bit + single-ended bit
        commandout <<= 3    # we only need to send 5 bits here
        for i in range(5):
                if (commandout & 0x80):
                        GPIO.output(mosipin, True)
                else:
                        GPIO.output(mosipin, False)
                commandout <<= 1
                GPIO.output(clockpin, True)
                GPIO.output(clockpin, False)

        adcout = 0
        # read in one empty bit, one null bit and 10 ADC bits
        for i in range(12):
                GPIO.output(clockpin, True)
                GPIO.output(clockpin, False)
                adcout <<= 1
                if (GPIO.input(misopin)):
                        adcout |= 0x1

        GPIO.output(cspin, True)

        adcout >>= 1       # first bit is 'null' so drop it
        return adcout

# change these as desired - they're the pins connected from the
# SPI port on the ADC to the Cobbler
SPICLK = 18
SPIMISO = 23
SPIMOSI = 24
SPICS = 25

# set up the SPI interface pins
GPIO.setup(SPIMOSI, GPIO.OUT)
GPIO.setup(SPIMISO, GPIO.IN)
GPIO.setup(SPICLK, GPIO.OUT)
GPIO.setup(SPICS, GPIO.OUT)

# 10k trim pot connected to adc #0
potentiometer_adc = 0;

last_read = 0       # this keeps track of the last potentiometer value
tolerance = 5       # to keep from being jittery we'll only change
                    # volume when the pot has moved more than 5 'counts'

sound = ''
i=0
while True:
    # read the analog pin
    value = readadc(potentiometer_adc, SPICLK, SPIMOSI, SPIMISO, SPICS)
    print value
    data = np.append(data,value)
    # hang out and do nothing for a half second
    sound += chr(int(data[i]))
    i = i + 1
    if keyboard.is_pressed('q'):
        #break
        np.savetxt('data.csv',data, delimiter=',')
        stream.write(sound)
        sound = ''


#sound.tobytes()


# while data != '':
#     stream.write(data)
#     data = wf.readframes(CHUNK)

stream.stop_stream()
stream.close()

p.terminate()
