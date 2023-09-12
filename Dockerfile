# Use an official Node.js runtime as the base image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the workspace's package.json and package-lock.json files to the container
COPY package.json package-lock.json ./

# Install dependencies using npm
RUN npm ci --production

# Copy the rest of the workspace's source code to the container
COPY . .

# Build and serve the client app
RUN nx run client:build --prod
CMD nx run client:serve

# Build and serve the server app
RUN nx run server:build --prod
CMD nx run server:serve
