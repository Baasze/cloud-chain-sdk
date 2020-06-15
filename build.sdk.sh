#!/usr/bin/env bash

rm -rf ./sdk/

tsc -p ./build-config/ts.sdk.json

cp ./build-config/package.sdk.json ./sdk/package.json

cp ./build-config/readme.sdk.md ./sdk/README.md

cp -r ./build-config/test ./sdk/