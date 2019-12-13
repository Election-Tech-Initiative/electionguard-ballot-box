#!/bin/bash

#https://peter.sh/experiments/chromium-command-line-switches/

command -v chromium-browser >/dev/null 2>&1 || {
    echo "Chromium Browser not found. installing."
    sudo apt-get update
    sudo apt-get install -y chromium-browser
}

chromium-browser --app=http://localhost:3000 --start-fullscreen 