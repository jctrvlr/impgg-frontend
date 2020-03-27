#!/bin/sh
cd /Users/johncummings/projects/impgg/impgg-frontend
yarn build
rsync -vrzc --delete --exclude /Users/johncummings/projects/impgg/impgg-frontend/build impggprodfront:/var/www/html
