#!/bin/bash

INSTALL_DIR="/opt/webapp"
SYSTEMD_DIR="/etc/systemd/system/"



# Systemd
sudo cp "$INSTALL_DIR/webapp.service" "$SYSTEMD_DIR"
sudo -i -u csye6225

systemctl daemon-reload
systemctl enable webapp
systemctl start webapp
systemctl status webapp

pgrep -f "webapp.service" > /dev/null