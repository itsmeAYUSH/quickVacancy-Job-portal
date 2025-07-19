#!/bin/bash

echo "Starting QuickVacancy Backend Build..."

# Install dependencies
echo "Installing dependencies..."
npm install

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Error: node_modules not found after npm install!"
    exit 1
fi

# Check if express is installed
if [ ! -d "node_modules/express" ]; then
    echo "Error: express not found in node_modules!"
    exit 1
fi

echo "Build completed successfully!" 