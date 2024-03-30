#!/bin/bash
LOG_DIR="/var/log/webapp"


sudo mkdir "$LOG_DIR"
sudo chown -R csye6225:csye6225 "$LOG_DIR"
sudo chmod 755 -R "$LOG_DIR"


sudo curl -sSO https://dl.google.com/cloudagents/add-google-cloud-ops-agent-repo.sh
sudo bash add-google-cloud-ops-agent-repo.sh --also-install
sudo mkdir -p /etc/google-cloud-ops-agent

sudo cp /tmp/config.yaml /etc/google-cloud-ops-agent/config.yaml
sudo systemctl restart google-cloud-ops-agent

sudo systemctl status google-cloud-ops-agent"*" --no-pager