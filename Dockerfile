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

# Copy all application code first
COPY . .

# Install and build client
RUN cd client && npm install && npm run build

# Install and build server
RUN cd server && npm install && npm run build

# Final stage for app image
FROM base

# Set production environment
ENV NODE_ENV="production"

# Copy built application
COPY --from=build /app/client/dist ./client/dist
COPY --from=build /app/server/dist ./server/dist
COPY --from=build /app/server/node_modules ./server/node_modules
COPY --from=build /app/server/package.json ./server/package.json

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD [ "node", "server/dist/server.js" ]
