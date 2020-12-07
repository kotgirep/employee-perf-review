#!/bin/sh

ssh ubuntu@52.71.116.115 <<EOF
    cd ~/employee-perf-review/
    git pull origin master
    sudo kill -9 $(lsof -t -i:3000)
    npm install
    nohup npm start &
EOF