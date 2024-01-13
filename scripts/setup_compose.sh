#!/bin/bash

if [ ! -f compose.override.yaml ]; then
    echo "compose.override.yaml not found, creating from example"
    cp compose.override.example.yaml compose.override.yaml
fi
