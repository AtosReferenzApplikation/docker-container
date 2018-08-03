#!bin/bash
#This script specifies which before_script steps should be executed, similiar to the before_install steps in runInstall.sh 

if [ $FLAG -eq 0 ]; then
echo "nothing to do here"
fi;
#if flag is 0, no importnant file has been changed, therfore skipping the before_script step

if [ $FLAG -eq 1 ]; then
. ./scripts/angularBeforeScript.sh
fi
#if flag is 1, angular application was changed, therefore running necessary steps in before_script step

if [ $FLAG -eq 2 ]; then
echo ""
#The echo has to be here, because no command in the then tag, would make the script fail
# Add any script for springCass ypu would like to performe in the before_script step
fi
#if FLAG is 2, something has been changed regarding spring applicaiton, therefore you can add a script for before_script step

if [ $FLAG -eq 3 ]; then
. ./scripts/angularBeforeScript.sh
# Add any script for springCass ypu would like to performe in the before_script step
fi
#if flag is 3, angular and springboot, or scripts were updatet, therefore everything will be checked
