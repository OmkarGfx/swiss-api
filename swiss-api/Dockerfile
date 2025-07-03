FROM node:18

# Install system dependencies required for native modules (like swisseph)
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy project files
COPY . .

# Install dependencies using npm (instead of npm ci to avoid native module issues)
RUN npm install

# Expose the port the app runs on
EXPOSE 3000

# Start the server
CMD ["node", "index.js"]
