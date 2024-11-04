# @Author: Giovanny Jacome
sleep 30s; echo "running set up script"; /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P Password12345 -d master -i /opt/vuelo-db-init.sql