#!/bin/bash

# Create a virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate the virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Install required packages
echo "Installing required packages..."
pip install flask python-dotenv google-generativeai flask-cors

# Check if port 5000 is in use
if lsof -i :5000 > /dev/null; then
    echo "Port 5000 is in use. Trying to find and kill the process..."
    echo "The following process is using port 5000:"
    lsof -i :5000
    read -p "Do you want to kill this process? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        kill -9 $(lsof -t -i:5000) 2>/dev/null
        echo "Process killed. Starting the application..."
    else
        echo "Please free port 5000 and try again."
        exit 1
    fi
fi

# Run the Flask application
echo "Starting the Flask application..."
python app.py
