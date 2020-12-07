#!/bin/sh

ssh ubuntu@52.71.116.115 <<EOF
    cd ~/employee-perf-review/
    git pull origin master
    lsof -t -i:3000 | xargs kill
    npm install
    nohup npm start &
EOF