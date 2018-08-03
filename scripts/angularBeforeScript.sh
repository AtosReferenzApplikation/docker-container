#!bin/bash
#before install steps for angular tests

export CHROME_BIN=chromium-browser
#Enviromnent variable, necessary for the angular test with Karma

export DISPLAY=:99.0
#variable that imitates a browser display

sh -e /etc/init.d/xvfb start
#start of the x frame buffer for the tests

sudo chown root /usr/lib/chromium-browser/chrome-sandbox
sudo chmod 4755 /usr/lib/chromium-browser/chrome-sandbox
#these two steps are necessary, because from time to time an error occures saying that
# /usr/lib/chromium-browser/chrome-sandbox isnt owned by root and has not the rights 4755
