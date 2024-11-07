
#!/bin/bash

#Clear console
clear

#Move work path
cd /opt/
echo Move workdir... done!

#Stop services
#sudo systemctl stop nginx
docker compose down
echo Stop Services... done!

#Build backend
cd /opt/
./build-back.sh

#Start services
docker compose up -d 
#sudo systemctl start nginx
echo Start services... done!
