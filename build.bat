@ECHO off

ECHO Cleaning dist directory...
RMDIR /s /q dist
MKDIR dist

ECHO Building website...
PUSHD client
CALL npm run build
POPD