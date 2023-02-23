# Multi-stage build allows expensive operations that build the node environment
# and fetch external dependencies to be cached without concern for layer size.
FROM node:18 as build

WORKDIR /app

# NPM install is expensive, caching prevents rebuilding unless necessary.
COPY package.json package-lock.json /app/
RUN npm ci --omit=dev

# This layer is only rebuilt for code changes
COPY . /app

FROM gcr.io/distroless/nodejs18-debian11 as runtime
COPY --from=build /app /app
ENV NODE_ENV=production
WORKDIR /app
CMD ["src/index.js"]
