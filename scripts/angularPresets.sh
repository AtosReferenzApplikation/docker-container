#!bin/bash
# The before_install step for angular testing

cd ./angular
npm remove webpack
npm install webpack@3.11.0
# needed ot be added, because from time to time travis throws an error saying that multiple webpackages are installed. this fixes the problem

npm install
# install all dependecies for Angular

npm run build
#compile the Angular App
cd ..
