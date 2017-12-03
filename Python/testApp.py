from Tkinter import Tk, Label, Button
import numpy as np
import random

on = False
i=0
data = np.array([])
sound = ''

def start():
    print 'start'
    global on
    on = True

def stop():
    global on, sound, data
    on = False
    #break
    np.savetxt('data.csv',data, delimiter=',')


def play():
    global sound
    print sound
    #stream.write(sound)



class App:
    def __init__(self, master):
        self.master = master
        master.title("A simple GUI")

        self.label = Label(master, text="This is our first GUI!")
        self.label.pack()

        self.start_button = Button(master, text="Start", command=start)
        self.start_button.pack()

        self.stop_button = Button(master, text="Stop", command=stop)
        self.stop_button.pack()

        self.play_button = Button(master, text="Play", command=play)
        self.play_button.pack()

        self.close_button = Button(master, text="Close", command=master.quit)
        self.close_button.pack()

    def greet(self):
        print("Greetings!")

def read():
    global on, data, sound,i
    if on:
        value = random.randint(0,9)
        #print value
        data = np.append(data,value)
        # hang out and do nothing for a half second
        sound += chr(int(data[i]))
        print sound
        i += 1

    root.after(100,read)
    #root.after(100, read())


root = Tk()
my_gui = App(root)
root.after(100,read)
root.mainloop()
