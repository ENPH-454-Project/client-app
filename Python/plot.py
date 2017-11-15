
import numpy as np
import matplotlib.pyplot as plt

plt.axis([0, 100, -50, 50])
plt.ion()

for i in range(100):
    if i>100:
        plt.axis([i-100, i, -50, 50])
    y =  50*np.sin(i*0.1)*(np.random.random()*0.4+0.6)
    plt.scatter(i, y)
    plt.pause(0.005)

while True:
    plt.pause(0.005)
