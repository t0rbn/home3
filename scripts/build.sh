#!/bin/bash

cd ..
cd client
yarn build

cd ..
cd server
rm -r build
yarn build