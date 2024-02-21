#!/bin/bash

ip4=127.0.0.1

#gst-launch-1.0 -e zedsrc ! videoconvert ! x264enc tune=zerolatency bitrate=1000 speed-preset=superfast ! h264parse ! queue ! rtph264pay config-interval=10 pt=96 ! udpsink host=$ip4 port=3333

gst-launch-1.0 -e  v4l2src ! videoconvert ! x264enc tune=zerolatency bitrate=1000 speed-preset=superfast ! h264parse ! queue ! rtph264pay config-interval=10 pt=96 ! udpsink host=$ip4 port=3333
