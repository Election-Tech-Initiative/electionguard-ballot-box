#!/bin/bash

PACKAGE_NAME='electionguard-ballot-box'
SERVICE_NAME='electionguard-ballot-box.service'

echo "installing Ballot Box dependencies"

command -v node >/dev/null 2>&1 || {
    echo "Node not found. installing."
    sudo apt-get install -y curl
    curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
    sudo apt-get install -y nodejs
    sudo ln -sf $(command -v node) /usr/bin/node
    sudo ln -sf $(command -v npm) /usr/bin/npm
}

node -v
npm -v

command -v yarn >/dev/null 2>&1 || { 
    echo "yarn not found. Installing."
    npm install -g yarn
}

echo "stopping Ballot Box services"
sudo systemctl stop $SERVICE_NAME
sudo systemctl disable $SERVICE_NAME
sudo rm -rf /etc/systemd/system/$SERVICE_NAME

if [ ! -d "/bin/$PACKAGE_NAME" ]; then
        sudo mkdir /bin/$PACKAGE_NAME
fi

sudo rm -rf /bin/$PACKAGE_NAME/*

sudo tar -zxvf $PACKAGE_NAME.tar.gz -C /bin/$PACKAGE_NAME/

sudo chmod -R 777 /bin/$PACKAGE_NAME

cd /bin/$PACKAGE_NAME
yarn install

cd /bin/$PACKAGE_NAME/prodserver
yarn install

sudo cp /bin/$PACKAGE_NAME/$SERVICE_NAME /etc/systemd/system/$SERVICE_NAME

echo "reloading services"
sudo systemctl daemon-reload
sudo systemctl reset-failed

echo "enabling services"
sudo systemctl enable $SERVICE_NAME

echo "starting ElectionGuard services"
sudo systemctl start $SERVICE_NAME
systemctl status $SERVICE_NAME --no-pager

echo "done"