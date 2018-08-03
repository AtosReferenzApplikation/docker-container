#!bin/bash
#checks the flag specified in chackChnges.sh and starts the appropriate scripts for the tests

if [ $FLAG -eq 0 ]; then
echo "skipping script step"
echo "succeded"
fi
#if FLAG is 0, no script for the tests will be performed, hence, the step will be skipped.

if [ $FLAG -eq 1 ]; then
. ./scripts/angularScript.sh
echo "succeded 2"
fi
#if FLAG is 1, only Angular tests will be performed

if [ $FLAG -eq 2 ]; then
. ./scripts/springCassScript.sh
fi
#if FLAG is 2 tests for springCass can be performed, you have to add a script in the script directory and place it here to 
#do so.

if [ $FLAG -eq 3 ]; then
. ./scripts/angularScript.sh
. ./scripts/springCassScript.sh
fi
#FLAG = 3 performes all tests for the Application.
