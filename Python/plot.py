import numpy as np
import matplotlib.pyplot as plt

plt.axis([0, 100, 0, 100])
plt.ion()

for i in range(10000):
    if i>100:
        plt.axis([i-100, i, 0, 100])
    y = np.random.random()*100
    plt.scatter(i, y)
    plt.pause(0.005)

while True:
    plt.pause(0.005)
