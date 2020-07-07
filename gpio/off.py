import RPi.GPIO as gpio

gpio.setmode(gpio.BCM)

ledPin = 4
gpio.setup(ledPin, gpio.IN)
