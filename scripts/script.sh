#!bin/bash

if [ $FLAG -eq 0 ]; then
echo "skipping script step"
fi

if [ $FLAG -eq 1 ]; then
. ./scripts/angularScript.sh
fi

if [ $FLAG -eq 2 ]; then
echo ""
# Add any Script for gradle to perfrom in the script step of .travis.yml
fi

if [ $FLAG -eq 3 ]; then
. ./scripts/angularScript.sh
# Add any Script for gradle to perfrom in the script step of .travis.yml
fi
