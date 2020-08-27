#!/bin/sh

set -e
set -u

npm run wp:plugin:build
npm run wp:plugin:release
