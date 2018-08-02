#!bin/bash

#This script specifies which before_script steps should be executed, similiar to the before_install steps in runInstall.sh 

if [ $FLAG -eq 0 ]; then
echo "nothing to do"
fi;

if [ $FLAG -eq 1 ]; then
. ./scripts/angularBeforeScript.sh
fi

if [ $FLAG -eq 2 ]; then
echo ""
# Add any script for springCass ypu would like to performe in the before_script step
fi

if [ $FLAG -eq 3 ]; then
. ./scripts/angularBeforeScript.sh
# Add any script for springCass ypu would like to performe in the before_script step
fi
