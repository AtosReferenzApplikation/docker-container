#!bin/bash
#The script step for the Angular application

cd ./angular
ng lint
npm audit fix
npm audit
#checking the files regarding the angular application and fixing dependency vulnerabilities

npm test
if [ $? -ne 0 ]
then exit 1
fi
#run tests, if the test fails, exit script with status 1. If the if clause wasn not here, the script would exit with status
#0. But that would make Travis say, that all tests were correct, since the script was executed correctly.
cd ..
