# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=22.18.0
FROM node:${NODE_VERSION}-slim AS base

LABEL fly_launch_runtime="Node.js"

# Node.js app lives here
WORKDIR /app

# Throw-away build stage to reduce size of final image
FROM base AS build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

# Install root dependencies
COPY package-lock.json package.json ./
RUN npm install

# Copy application code
COPY . .

# Install and build client
WORKDIR /app/client
RUN npm install
RUN npm run build

# Install and build server
WORKDIR /app/server
RUN npm install
RUN npm run build

# Back to root
WORKDIR /app

# Final stage for app image
FROM base

# Set production environment
ENV NODE_ENV="production"

# Copy built application
COPY --from=build /app/client/dist /app/client/dist
COPY --from=build /app/server/dist /app/server/dist
COPY --from=build /app/server/node_modules /app/server/node_modules
COPY --from=build /app/server/package.json /app/server/package.json

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD [ "node", "server/dist/server.js" ]
