#!/bin/bash

cd ..
cd client
npm install
npm run build

cd ..
cd server
npm install
rm -r build
npm run build

cd ..
sudo cp home3.service /etc/systemd/system
sudo systemctl daemon-reload
sudo systemctl enable home3.service
sudo systemctl restart home3.service
