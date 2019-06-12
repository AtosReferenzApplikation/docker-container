#!bin/bash
# The before_install step for angular testing

cd ./angular

npm install
# install all dependecies for Angular

npm run build
#compile the Angular App
cd ..



