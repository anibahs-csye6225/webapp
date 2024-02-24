#!/bin/bash

INSTALL_DIR="/opt/webapp"
SYSTEMD_DIR="/etc/systemd/system/"

echo "check npm installation"
which npm

echo "check postgres service"
sudo systemctl status postgresql

if [ -d "$INSTALL_DIR" ]; then
    # Systemd
    sudo cp "$INSTALL_DIR/csye6225.service" "$SYSTEMD_DIR"
    sudo chown -R csye6225:csye6225 $INSTALL_DIR/
    sudo chmod 755 /opt/webapp
fi

sudo systemctl daemon-reload
sudo systemctl enable csye6225
sudo systemctl start csye6225
sudo systemctl status csye6225

pgrep -f "webapp.service" > /dev/null