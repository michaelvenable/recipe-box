echo "Cleaning dist directory..."
rm -rf dist
mkdir dist

echo "Packaging web service..."
pushd server/recipes/
zip ../../dist/recipes-delete.zip delete.js
zip ../../dist/recipes-get.zip get.js
zip ../../dist/recipes-index.zip index.js
zip ../../dist/recipes-post.zip post.js
zip ../../dist/recipes-put.zip put.js
popd
pushd server/data-access
zip ../../dist/recipe-repository.zip recipe-repository.js
popd

echo "Building website..."
pushd client
npm run build
popd