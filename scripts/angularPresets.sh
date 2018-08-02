#!bin/bash
# The before_install step for angular testing
cd ./angular
npm install sync-exec
npm install -g @angular/cli@1.6.8
npm install -g karma
npm install -g ajv@6.0.0
npm install -g ajv-keywords@3.2.0
npm remove webpack
npm install webpack@3.11.0
npm run build
cd ..
