from Tkinter import Tk, Label, Button
import tkSimpleDialog
import numpy as np
import random
import wave
# from scipy.io.wavfile import read, write
import scipy.io.wavfile as sciWav
import pyaudio
import requests
import pygame
import time
import os
import RPi.GPIO as GPIO
import numpy as np
import matplotlib.pyplot as plt

GPIO.setmode(GPIO.BCM)
DEBUG = 1

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


on = False
i=0
data = np.array([])
sound = ''
audio = np.array([])

def load():
    global audio
    audio = wave.open()

def start():
    print 'start'
    global on
    on = True

def DSP():
    REC_AUDIO = sciWav.read("rec.wav")
    REC_AUDIO_ARRAY = np.array(REC_AUDIO[1], dtype=np.int16)
    REC_SAMPLE_RATE = REC_AUDIO[0]
    HIGH_CUTOFF = 100000 # Hz
    LOW_CUTOFF = 0
    CUTOFF = 100000
    ORDER = 5
    DSPdata= {
        'dsp_suite': ['remove_interference_peak'],
        'params': {'sample_rate': REC_SAMPLE_RATE,
                   'high_cutoff': HIGH_CUTOFF,
                   'low_cutoff': LOW_CUTOFF,
                   'cutoff': CUTOFF,
                   'signal': REC_AUDIO_ARRAY,
                   'order': ORDER}
        }
    print DSPdata



def stop():
    global on, sound, data
    on = False
    #break
    np.savetxt('data.csv',data, delimiter=',')
    DSP()


def play():
    global sound
    filepath = 'you-need-to-grow-up.wav'
    pygame.mixer.init()
    pygame.mixer.music.load(filepath)
    pygame.mixer.music.play()
    while pygame.mixer.music.get_busy() == True:
        continue

def loadAll():
    print requests.get('http://www.google.com')




def saveAs():
    filename = tkSimpleDialog.askstring("Name prompt", "enter your name") + '.wav'
    sciWav.write(filename, 44000, data)

class App:
    def __init__(self, master):
        global on
        self.master = master
        master.title("A simple GUI")

        self.label = Label(master, text=on)
        self.label.pack()

        self.start_button = Button(master, text="Start", command=start)
        self.start_button.pack()

        self.stop_button = Button(master, text="Stop", command=stop)
        self.stop_button.pack()

        self.play_button = Button(master, text="Play", command=play)
        self.play_button.pack()

        self.load_button = Button(master, text="Load", command=loadAll)
        self.load_button.pack()

        self.save_button = Button(master, text="Save", command=saveAs)
        self.save_button.pack()

        self.close_button = Button(master, text="Close", command=master.quit)
        self.close_button.pack()


    def greet(self):
        print("Greetings!")

def read():
    global on, data, sound,i
    if on:
        value = readadc(potentiometer_adc, SPICLK, SPIMOSI, SPIMISO, SPICS)
        data = np.append(data,value)
    root.after(10,read)


root = Tk()
my_gui = App(root)
root.after(10,read)
root.mainloop()
