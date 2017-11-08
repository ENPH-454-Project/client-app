[y,Fs] = audioread('test.m4a')
sound(y,Fs)
f2 = fft(y(:,1))
plot(real(f2))