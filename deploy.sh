#!/bin/sh
cd /Users/batman/projects/impgg/impgg-frontend
yarn build
rsync -vrzc --delete /Users/batman/projects/impgg/impgg-frontend/build/ impggprodfrontdeploy:/var/www/html/
