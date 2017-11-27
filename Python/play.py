import pyaudio
import wave
import math

p = pyaudio.PyAudio()

stream = p.open(format=p.get_format_from_width(width=1),
                channels=1,
                rate=40000,
                output=True)

data = [0]
for i in range(100000):
    data.append(255*math.sin(i))

data.tobytes()
stream.write(data)

# while data != '':
#     stream.write(data)
#     data = wf.readframes(CHUNK)

stream.stop_stream()
stream.close()

p.terminate()
