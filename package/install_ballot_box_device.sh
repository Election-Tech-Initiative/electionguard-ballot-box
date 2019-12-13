#!/bin/bash
# This script can be loaded onto a usb flash drive along with the depndency artifacts to execute the installation

cd module-usb-artifacts
sudo bash install.sh

cd ..

cd electionguard-ballot-box-artifacts
sudo bash install.sh

systemctl status module-usb.service --no-pager
systemctl status electionguard-ballot-box.service --no-pager
echo "done"

exit 0