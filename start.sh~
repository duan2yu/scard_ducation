#!/bin/sh

echo 'starting qiniu server...'
node  ./qiniu/server.js &
sleep 1
echo 'starting scard server...'
cd ./bin
nohup babel-node --harmony main.js --project=scard-ducationBureau > ../logs/scard.log 2>&1&
