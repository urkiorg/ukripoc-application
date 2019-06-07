#!/bin/sh
for l in amplify/backend/function/*/ ; do
    if [ -d "$l"src ]; then
        pushd "$l"src
        npm i
        npm run build
        popd
    fi
done