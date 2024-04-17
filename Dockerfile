# Use official Node.js image as base
FROM node:current-alpine as build

# Set working directory in the container
WORKDIR /app


# Copy package.json and package-lock.json to the working directory
COPY package*.json  ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React.js application
RUN npm run build

# Expose the port that Next.js runs on
EXPOSE 80

# Run the React.js application
CMD ["npm", "start" ]