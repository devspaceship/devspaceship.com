#!/bin/bash

if [ ! -d web/node_modules ]; then
    echo "node_modules not found, installing"
    docker compose run web npm install
fi
