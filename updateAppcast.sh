#!/bin/sh

echo 'Version: ' $1
echo 'URL: ' $2

xmlstarlet ed -L -s "/rss/channel" -t elem -n itemTmp -v "" \
            -s //itemTmp -t elem -n title -v "Version v$1" \
            -s //itemTmp -t elem -n enclosureTmp -v "" \
            -s //enclosureTmp -t attr -n url -v $2 \
            -s //enclosureTmp -t attr -n sparkle:version -v $1 \
            -r //enclosureTmp -v enclosure \
            -r //itemTmp -v item \
            appcast.xml

cat appcast.xml
