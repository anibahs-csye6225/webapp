#!/bin/bash

pwd

# install dependancies - nodejs, unzip, postgres
sudo dnf install -y unzip
which unzip


#create user for application
sudo adduser -U csye6225 --system

ZIP_FILE="/tmp/webapp.zip"
INSTALL_DIR="/opt/webapp"

# Check if the ZIP file exists
if [ ! -f "$ZIP_FILE" ]; then
    echo "Error: Artifact not found!"
    exit 1
fi

#copy artifact into destination folder
sudo unzip $ZIP_FILE -d $INSTALL_DIR
if [ -f "$INSTALL_DIR" ]; then
    sudo chown -R csye6225:csye6225 $INSTALL_DIR/
    sudo -i -u csye6225
    cd $INSTALL_DIR || exit 1
    sudo dnf module install -y nodejs:21
fi

