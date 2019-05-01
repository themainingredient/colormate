#!/bin/sh

echo 'Version: ' $1

URL="https://github.com/themainingredient/colormate/releases/download/v"$1"/colormate.sketchplugin.zip"

xmlstarlet ed -L -s "/rss/channel" -t elem -n itemTmp -v "" \
            -s //itemTmp -t elem -n title -v "Version v$1" \
            -s //itemTmp -t elem -n enclosureTmp -v "" \
            -s //enclosureTmp -t attr -n url -v $URL \
            -s //enclosureTmp -t attr -n sparkle:version -v $1 \
            -r //enclosureTmp -v enclosure \
            -r //itemTmp -v item \
            ..xml

cat .appcast.xml
