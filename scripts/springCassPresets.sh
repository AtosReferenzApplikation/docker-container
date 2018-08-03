#!bin/bash
#when executred this script brings up the conatiner of Cassandra an Spring.

#cd ./cassandra
#docker-compose up &
#sleep 30
#first the cassandra container has to be brought up, as you can see in the wiki section.
#therefore you have to cd to cassandra directory and use docker-compose. The sleep is set because you have to wait for another action
#until the cassandra container is up and running, and this takes a while
#cd ..

cd ./springCass
gradle build
cd ..
#After this gradle has to build the spring app before running the container, as you can see in the wiki section as well.
#After that a small syntax test will be executed.

#docker-compose build
#docker-compose up
#At last the container for Soring is brought up
