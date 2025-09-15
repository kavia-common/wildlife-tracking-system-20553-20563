#!/bin/bash
cd /home/kavia/workspace/code-generation/wildlife-tracking-system-20553-20563/animal_tracking_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

