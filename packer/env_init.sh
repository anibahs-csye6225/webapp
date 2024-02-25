#!/bin/bash

pwd


ZIP_FILE="/tmp/webapp.zip"
INSTALL_DIR="/opt/webapp"

echo "Updated dnf repo"
sudo dnf upgrade -y


# Check if the ZIP file exists
if [ ! -f "$ZIP_FILE" ]; then
    echo "Error: Artifact not found!"
    exit 1
else 
    echo "Zip file copied successfully"
fi

echo "Proceed with setting up webapp"

sudo dnf install -y unzip
which unzip

#copy artifact into destination folder
sudo unzip -q $ZIP_FILE -d /opt
echo "Unzipped webapp artifact"

#create user for application
echo "Add user csye6225 for webapp"
sudo adduser -U csye6225 --system

ls -lart /opt
if [ -d "$INSTALL_DIR" ]; then
    echo "Start setting up application"
    cd "$INSTALL_DIR" || exit 1
    sudo chmod -R 755 ./../webapp
    echo "PWD: " 
    pwd
    sudo dnf module install -y nodejs:20
    sudo dnf module install -y nodejs:20/common
    sudo dnf install -y npm
fi
echo "We have installed the dependencies!"
