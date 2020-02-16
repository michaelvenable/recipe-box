@ECHO off

ECHO Tearing down...
PUSHD deployment
terraform destroy -auto-approve -state ..\build-artifacts\terraform\terraform.tfstate
POPD