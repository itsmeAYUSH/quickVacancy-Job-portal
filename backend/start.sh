#!/bin/bash

echo "Starting QuickVacancy Backend..."

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Check if server.js exists
if [ ! -f "server.js" ]; then
    echo "Error: server.js not found!"
    exit 1
fi

echo "Starting server..."
npm start 