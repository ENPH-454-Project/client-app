from Tkinter import Tk, Label, Button
import numpy as np
import random
import wave
from scipy.io.wavfile import read, write
import pyaudio


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

def DSP(data):

def stop():
    global on, sound, data
    on = False
    #break
    np.savetxt('data.csv',data, delimiter=',')
    DSP(data)


def play():
    global sound
    filepath = 'rec.wav'
    chunk = 1024
    #open a wav format music
    signal = wave.open(filepath)
    print(signal)
    #instantiate PyAudio
    _pyaudio = pyaudio.PyAudio()
    #open stream
    stream = _pyaudio.open(format=_pyaudio.get_format_from_width(signal.getsampwidth()),
                           channels=signal.getnchannels(),
                           rate=signal.getframerate(),
                           output=True)
    #read data
    data = signal.readframes(chunk)

    #play stream
    while data:
        stream.write(data)
        data = signal.readframes(chunk)

    #stop stream
    stream.stop_stream()
    stream.close()

    #close PyAudio
    _pyaudio.terminate()

def loadAll():





def saveAs():



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
        value = random.randint(0,9)
        print chr(value)
        data = np.append(data,value)
        sound += chr(value)
        #print data[i]

    root.after(100,read)
    #root.after(100, read())


root = Tk()
my_gui = App(root)
root.after(100,read)
root.mainloop()
