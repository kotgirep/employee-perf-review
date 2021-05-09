#!/bin/sh

ssh ubuntu@54.172.246.61 <<EOF
    cd ~/employee-perf-review/
    git pull 
    npm install
    sudo npm install -g nodemon pm2
    pm2 restart ecosystem.config.js
    exit
EOF