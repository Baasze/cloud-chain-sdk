#!/usr/bin/env bash

rm -rf ./command/

tsc -p ./build-config/ts.command.json

cp ./build-config/package.command.json ./command/package.json

cp ./build-config/readme.command.md ./command/README.md

mv ./command/command.js ./command/index.js