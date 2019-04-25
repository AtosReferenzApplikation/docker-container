#!bin/bash
# The before_install step for angular testing

cd ./angular
npm remove webpack
npm install webpack@4.4.1
# needed to be added, because from time to time travis throws an error saying that multiple webpackages are installed. this fixes the problem
npm install --save-dev karma@3.0.0
#needed since it makes the command "npm audit fix" able to fix 14 dependency vulnerabilities.

npm install
npm uninstall node-sass
npm install node-sass@3.8.0
# install all dependecies for Angular

npm run build
#compile the Angular App
cd ..



