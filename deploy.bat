@ECHO off

CALL build.bat

REM Copy the website to S3.
aws s3 cp client\build s3://orbital-recipe-box --exclude "*" --include "*.json" --recursive --content-type "application/json"
aws s3 cp client\build s3://orbital-recipe-box --exclude "*" --include "*.html" --recursive --content-type "text/html"
aws s3 cp client\build s3://orbital-recipe-box --exclude "*" --include "*.js" --recursive --content-type "application/javascript"
aws s3 cp client\build s3://orbital-recipe-box --exclude "*" --include "*.css" --recursive --content-type "text/css"
aws s3 cp client\build s3://orbital-recipe-box --exclude "*" --include "*.map" --recursive --content-type "application/octet-stream"
aws s3 cp client\build s3://orbital-recipe-box --exclude "*" --include "*.txt" --recursive --content-type "text/plain"
aws s3 cp client\build s3://orbital-recipe-box --exclude "*" --include "static/media/*" --recursive --content-type "application/octet-stream"