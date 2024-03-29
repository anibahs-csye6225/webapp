#!/bin/bash

sudo mkdir /etc/google-cloud-ops-agent
#sudo touch /etc/google-cloud-ops-agent/config.yaml
sudo cp /tmp/config.yaml /etc/google-cloud-ops-agent/config.yaml
sudo chmod -R 755 /var/log/webapp.log
sudo curl -sSO https://dl.google.com/cloudagents/add-google-cloud-ops-agent-repo.sh
sudo bash add-google-cloud-ops-agent-repo.sh --also-install

sudo systemctl status google-cloud-ops-agent"*" --no-pager