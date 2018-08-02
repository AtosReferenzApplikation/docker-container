#!bin/bash
echo "FLAG = "$FLAG
if [ $FLAG -eq 0 ]; then
echo "No important file has been changed"
fi

if [ $FLAG -eq 1 ]; then
. ./scripts/angularPresets.sh
fi

if [ $FLAG -eq 2 ]; then
echo ""
 #Add a Script for springCass eg. gradle that specifies the before_install step in .travis.yml
fi

if [ $FLAG -eq 3 ]; then
. ./scripts/angularPresets.sh
 #Add a Script for springCass eg. gradle that specifies the before_install step in .travis.yml
fi
