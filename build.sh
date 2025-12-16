#!/bin/bash
set -e

# 1️⃣ Clean previous build
echo "Cleaning previous build..."
rm -rf dist/cef

# 2️⃣ Build Angular app
echo "Building Angular app..."
ng build --base-href ./ --output-path dist/cef

# 3️⃣ Patch index.html to remove type="module"
# This step is necessary, because g2o uses the file:// protocoll to load the app, so we need to avoid everything like CORS that could block us.
INDEX_FILE="dist/cef/browser/index.html"

if [ -f "$INDEX_FILE" ]; then
    echo "Patching $INDEX_FILE to remove type=\"module\"..."
    sed -i 's/type="module"//g' "$INDEX_FILE"
    echo "Patch complete!"
else
    echo "Error: $INDEX_FILE not found!"
    exit 1
fi

# TODO: remove static path!!
rm -rf ~/modding/G2OClean/_work/Data/WEB/*
cp -r dist/cef/browser/* ~/modding/G2OClean/_work/Data/WEB/

echo "Build finished. CEF can now load index.html directly."