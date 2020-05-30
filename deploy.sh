./build.sh

echo "Deploying..."
pushd deployment
terraform apply -auto-approve -state ../build-artifacts/terraform/terraform.tfstate
popd

# Copy the website to S3.
if [ "$1" = "with-client" ]
then
    aws s3 cp client/build s3://orbital-recipe-box --exclude "*" --include "*.json" --recursive --content-type "application/json"
    aws s3 cp client/build s3://orbital-recipe-box --exclude "*" --include "*.html" --recursive --content-type "text/html"
    aws s3 cp client/build s3://orbital-recipe-box --exclude "*" --include "*.js" --recursive --content-type "application/javascript"
    aws s3 cp client/build s3://orbital-recipe-box --exclude "*" --include "*.css" --recursive --content-type "text/css"
    aws s3 cp client/build s3://orbital-recipe-box --exclude "*" --include "*.map" --recursive --content-type "application/octet-stream"
    aws s3 cp client/build s3://orbital-recipe-box --exclude "*" --include "*.txt" --recursive --content-type "text/plain"
    aws s3 cp client/build s3://orbital-recipe-box --exclude "*" --include "static/media/*" --recursive --content-type "application/octet-stream"
fi