#!/bin/sh
cd /Users/johncummings/projects/impgg/impgg-frontend
yarn build
rsync -vrzc --delete /Users/johncummings/projects/impgg/impgg-frontend/build/ impggprodfrontdeploy:/var/www/html/
