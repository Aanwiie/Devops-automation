FROM node:18-alpine

# Install system dependencies for builds
RUN apk add --no-cache bash git make g++

WORKDIR /usr/src/app

# Copy dependency files first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Set environment
ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "run", "start:api"]
