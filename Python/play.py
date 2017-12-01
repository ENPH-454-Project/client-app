import pyaudio
import wave
import math
import numpy as np
from scipy.io.wavfile import read, write
import time
import keyboard

p = pyaudio.PyAudio()
freq = 440
bitrate = 44100
stream = p.open(format=p.get_format_from_width(1),
                channels=1,
                rate=bitrate,
                output=True)
x = np.array(read('rec.wav')[1],dtype=np.int16)
print x.max(), x.min()

data = np.array([])
sound = ''
i=0

while True:
    new = np.array([int(127*math.sin(i/((bitrate/freq)/(2*math.pi)))+128)])
    data = np.append(data,new)
    sound += chr(int(data[i]))
    i = i + 1
    if keyboard.is_pressed('q'):
        #break
        np.savetxt('data.csv',data, delimiter=',')
        stream.write(sound)
        sound = ''
        print sound

print data

#sound.tobytes()

# while data != '':
#     stream.write(data)
#     data = wf.readframes(CHUNK)

stream.stop_stream()
stream.close()

p.terminate()
