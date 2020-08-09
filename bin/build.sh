#!/bin/bash

set -e
set -u

# Ensure build dir exists
BUILD_DIR=build
rm -rf ${BUILD_DIR}
mkdir -p ${BUILD_DIR}

# Install build dependencies
composer install
npm install

# Build
npm run blocks:build

# Copy required files to Build Dir
echo "Copying plugin files to ${BUILD_DIR}"

cp -prv dist ${BUILD_DIR}/
cp -prv languages ${BUILD_DIR}/
cp -prv vendor ${BUILD_DIR}/
cp -prv *.php ${BUILD_DIR}/

find src -name '*.php' | \
cpio \
  --pass-through \
  --make-directories \
  --preserve-modification-time \
  --quiet \
  --verbose \
  ${BUILD_DIR}

# Package
echo "Creating the plugin archive"
cd ${BUILD_DIR}
zip \
 --recurse-paths \
 alps-gutenberg-blocks.zip \
 *
