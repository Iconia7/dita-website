#!/bin/bash

# DITA Election System - Ubuntu VPS Setup Script
echo "--- Starting DITA Election Backend Setup ---"

# 1. Update and Install Docker
echo "Installing Docker and Docker Compose..."
sudo apt update && sudo apt install -y docker.io docker-compose
sudo systemctl start docker
sudo systemctl enable docker

# 2. Check for .env file
if [ ! -f .env ]; then
    echo "Creating .env from .env.example..."
    cp .env.example .env
    echo "WARNING: Please edit the .env file with your SMTP credentials and JWT_SECRET!"
fi

# 3. Start Containers
echo "Starting Docker containers..."
sudo docker-compose up -d

# 4. Wait for DB to be ready
echo "Waiting for database to initialize (10s)..."
sleep 10

# 5. Initialize Schema
if [ -f schema.sql ]; then
    echo "Initializing database schema..."
    sudo docker exec -i $(sudo docker ps -qf "name=db") psql -U dita -d elections < schema.sql
else
    echo "Error: schema.sql not found. Database not initialized."
fi

echo "--- Setup Complete! ---"
echo "Your API is running on port 5000."
