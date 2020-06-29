#!/usr/bin/env bash

yarn build
yarn build:demo
sed -i s/=\\//=.\\//g demo/index.html > demo/index.html
npm publish
