#!bin/bash
#script file for tests regarding the spring application.

cd ./springCass
cp src/test/resources/configs/application.properties src/test/resources/application.properties
gradle test
#here you could add your test for Spring. keep in mind to track whether the command to run the test fails as you can see below,
#since the script otherwise won´t fail and exit with 0, causing travis to think that all tests were succsesfull.

if [ $? -ne 0 ] 
then exit 1
fi
cd ..
