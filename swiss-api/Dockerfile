# Use a base Node image with build tools
FROM node:18

# Install dependencies required for swisseph native build
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy everything
COPY . .

# Install dependencies
RUN npm install

# Expose the port your app runs on
EXPOSE 3000

# Start the server
CMD ["node", "index.js"]
