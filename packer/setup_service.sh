#!/bin/bash

INSTALL_DIR="/opt/webapp"
SYSTEMD_DIR="/etc/systemd/system/"

echo "check npm installation"
which npm

echo "check postgres service"
sudo systemctl status postgresql --no-pager

echo "Start csye6225.service"
ls -lart /opt
if [ -d "$INSTALL_DIR" ]; then
    # Systemd
    sudo cp "$INSTALL_DIR/csye6225.service" "$SYSTEMD_DIR"
    ls -lart "$SYSTEMD_DIR"
    sudo chown -R csye6225:csye6225 $INSTALL_DIR/
    sudo chown -R csye6225:csye6225 "$SYSTEMD_DIR/csye6225.service"
    sudo chmod 755 -R $INSTALL_DIR/
    sudo chmod 755 -R "$SYSTEMD_DIR/csye6225.service"
    ls -lart "$SYSTEMD_DIR"
    ls -lart "$INSTALL_DIR"

fi

sudo systemctl daemon-reload
sudo systemctl enable csye6225
sudo systemctl start csye6225
sudo systemctl status csye6225 --no-pager

sudo pgrep -f "webapp.service" > /dev/null
#exit 1