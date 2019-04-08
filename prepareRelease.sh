#!/bin/sh

echo 'Building APP with version: ' $1
echo 'Building app for branch: ' $2

if [ "$2" = "feature/ship-to-production" ] # TODO: change this to regex matching release branches
then
  jq --arg h "$1" '.version=$h' package.json | sponge package.json
  jq --arg h "$1" '.version=$h' src/manifest.json | sponge src/manifest.json
  echo 'export PATH=~/bin:$PATH' >> $BASH_ENV
  echo 'export REACT_APP_VERSION=$(cat $1)' >> $BASH_ENV
fi


