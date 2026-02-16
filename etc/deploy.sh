#!/bin/bash

cd ..

rm -rf build
yarn
yarn build

mkdir -p build/standalone/public/_next
cp -r build/static build/standalone/public/_next
cp -r public build/standalone

ssh pi@192.168.0.103 rm -r /home/pi/home3-standalone/*
scp -r build/* pi@192.168.0.103:~/home3-standalone
ssh pi@192.168.0.103 sudo systemctl restart home3.service