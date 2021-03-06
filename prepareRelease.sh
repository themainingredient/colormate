#!/bin/sh

echo 'Building APP with version: ' $1
echo 'Building app for branch: ' $2

jq --arg h "$1" '.version=$h' package.json | sponge package.json
jq --arg h "$1" '.version=$h' src/manifest.json | sponge src/manifest.json

touch .env
echo REACT_APP_VERSION=$1 >> .env

if [[ "$2" =~ release/* ]]
then
  echo REACT_APP_ENV=staging >> .env
  echo REACT_APP_IS_BETA=true >> .env
fi
