#!/bin/bash

#==========================================================
#Remove backend and temp images
docker rmi -f $(docker images --filter='dangling=true' -a -q)
docker rmi -f $(docker images 'backend-login' -a -q)
docker rmi -f $(docker images 'backend-vuelo' -a -q)

#==========================================================
#Clone git repository
cd /opt/application/
rm -R Los-M-APIS----Los-M-asterribles-para-las--APIS/
git clone https://github.com/ups-gye/Los-M-APIS----Los-M-asterribles-para-las--APIS.git

#==========================================================
#Build & upload login image
cd /opt/application/Los-M-APIS----Los-M-asterribles-para-las--APIS/login
#Build application
gradle build --stacktrace
#Build image
docker build -t backend-login .

#==========================================================
#Build & upload login image
cd /opt/application/Los-M-APIS----Los-M-asterribles-para-las--APIS/Vuelos
#Build image
docker build -t backend-vuelo .


#==========================================================
#Removing old and temp images
docker rmi -f $(docker images --filter='dangling=true' -a -q)
echo *** Image build... done!
docker image list


