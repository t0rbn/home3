#!/bin/bash

HOST=pi@192.168.0.103
SSH_CTRL=/tmp/deploy-ssh-%r@%h:%p

# Open a single shared SSH connection up front (prompts for the password once).
# All later ssh/scp calls reuse it via the control socket, so no more prompts.
ssh -M -S "$SSH_CTRL" -o ControlPersist=yes -fN "$HOST"
# Close the shared connection when the script exits.
trap 'ssh -S "$SSH_CTRL" -O exit "$HOST" 2>/dev/null' EXIT

cd ..

rm -rf build
yarn
yarn build

mkdir -p build/standalone/public/_next
cp -r build/static build/standalone/public/_next
cp -r public build/standalone

ssh -S "$SSH_CTRL" "$HOST" rm -r /home/pi/home3-standalone/*
scp -o ControlPath="$SSH_CTRL" -r build/* "$HOST":~/home3-standalone
ssh -S "$SSH_CTRL" "$HOST" sudo systemctl restart home3.service
