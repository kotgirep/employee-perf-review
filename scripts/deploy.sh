#!/bin/sh

ssh ubuntu@52.71.116.115 <<EOF
    cd ~/employee-perf-review/
    git pull origin master
    npm install
    npm install -g nodemon pm2
    pm2 restart ecosystem.config.js
    exit
EOF