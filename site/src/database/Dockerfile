FROM mcr.microsoft.com/mssql/server:2017-latest
ENV ACCEPT_EULA=Y
ENV SA_PASSWORD=#Gfurubu100
ENV MSSQL_PID=Developer
ENV MSSQL_TCP_PORT=1433
WORKDIR ./
COPY script.sql ./script.sql
RUN (/opt/mssql/bin/sqlservr --accept-eula & ) | grep -q "Service Broker manager has started" &&  /opt/mssql-tools/bin/sqlcmd -Slocalhost -Usa -P#Gfurubu100 -i script.sql