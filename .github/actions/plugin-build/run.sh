#!/bin/sh

set -e
set -u

# Install build dependencies
composer install
npm install

# Build
npm run build

# Copy to dest

# Package
