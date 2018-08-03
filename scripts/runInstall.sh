#!bin/bash
#Checking which before_install steps should be performed, depending on the FLAG set in checkChanges.sh
echo "FLAG = "$FLAG
#Print the curretn FLAG

if [ $FLAG -eq 0 ]; then
echo "No important file has been changed here"
fi
# if FLAG is 0, no important Change has been made, therefore skipping the step

if [ $FLAG -eq 1 ]; then
. ./scripts/angularPresets.sh
fi
# if FLAG = 1, Angular application was updatet in some way, therefore the before_install steps for angular will be performed 

if [ $FLAG -eq 2 ]; then
echo ""
#. ./scripts/springCassPresets.sh
#Add a Script for springCass eg. gradle that specifies the before_install step in .travis.yml
fi
#if FLAG = 2, springCass has been updatet. Therefore the presets for Springboot application will be performed.

if [ $FLAG -eq 3 ]; then
. ./scripts/angularPresets.sh
#. ./scripts/springCassPresets.sh
fi
# Angular and springCass, or the scripts were updatet, therefore everything will be checked.
