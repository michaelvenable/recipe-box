@ECHO off

ECHO Cleaning dist directory...
RMDIR /s /q dist
MKDIR dist

ECHO Packaging web service...
POWERSHELL Compress-Archive server\recipes\get.js -DestinationPath dist\recipes-get.zip
POWERSHELL Compress-Archive server\recipes\index.js -DestinationPath dist\recipes-index.zip
POWERSHELL Compress-Archive server\recipes\post.js -DestinationPath dist\recipes-post.zip
POWERSHELL Compress-Archive server\recipes\put.js -DestinationPath dist\recipes-put.zip

ECHO Building website...
PUSHD client
CALL npm run build
POPD