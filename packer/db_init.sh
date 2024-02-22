#!/bin/bash


sudo dnf install -y postgresql-server
sudo systemctl enable postgresql
sudo /usr/bin/postgresql-setup --initdb
sudo systemctl start postgresql
sudo -i -u postgres psql -t -P format=unaligned -c 'show hba_file';

PG_CONFIG=$(sudo -i -u postgres psql -t -P format=unaligned -c 'show hba_file';)
echo "$PG_CONFIG"
# PG_CONFIG="/var/lib/pgsql/data/pg_hba.conf"
#echo "host    all             postgres        127.0.0.1/32            trust" | sudo tee -a "$PG_CONFIG"
sudo sed -i 's/ident/trust/g' "$PG_HBA_CONF"

sudo tail "$PG_CONFIG"
sudo systemctl stop postgresql
sudo systemctl start postgresql

sudo systemctl status postgresql --no-pager
