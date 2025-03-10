# Use the official Ubuntu base image
FROM ubuntu:latest

# Set environment variable
ENV NODE_ENV=development

# Install Node.js and npm
RUN apt update && apt upgrade -y && \
    apt install npm -y
    

# Set the working directory
WORKDIR /usr/src/app 

# Copy package.json and package-lock.json
COPY ["package.json", "package-lock.json*", "gsap-bonus.tgz", "./"]
# Install dependencies
RUN npm install

# Build the application
RUN npm run build

# Move node_modules to the parent directory (if needed)
RUN mv node_modules ../

# Copy the rest of the application code
COPY . .
# Set file permissions (optional, but ensure 'node' user exists or create it)
RUN groupadd -r node && useradd -r -g node node && \
    chown -R node:node /usr/src/app

# Switch to the 'node' user
USER node

# Expose the port that your app will run on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"]
