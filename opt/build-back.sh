#!/bin/bash

#==========================================================
#Remove backend and temp images
docker rmi -f $(docker images --filter='dangling=true' -a -q)
docker rmi -f $(docker images 'backend-login' -a -q)
docker rmi -f $(docker images 'backend-cliente' -a -q)
docker rmi -f $(docker images 'backend-reserva' -a -q)

#==========================================================
#Clone git repository
cd /opt/application/
rm -R Los-M-APIS----Los-M-asterribles-para-las--APIS/
git clone https://github.com/ups-gye/Los-M-APIS----Los-M-asterribles-para-las--APIS.git

#==========================================================
#Build & upload backend-login image
cd /opt/application/Los-M-APIS----Los-M-asterribles-para-las--APIS/login
#Build application
gradle build --stacktrace
#Build image
docker build -t backend-login .

#==========================================================
#Build & upload backend-cliente image
cd /opt/application/Los-M-APIS----Los-M-asterribles-para-las--APIS/clientRest
#Build image
docker build -t backend-cliente .

#==========================================================
#Build & upload backend-reserva image
cd /opt/application/Los-M-APIS----Los-M-asterribles-para-las--APIS/flight-reservation-backend
#Build image
docker build -t backend-reserva .

#==========================================================
#Removing old and temporal images
docker rmi -f $(docker images --filter='dangling=true' -a -q)
echo *** Image build... done!
docker image list


