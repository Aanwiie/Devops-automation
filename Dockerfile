FROM node:18-alpine

# Install bash and git (optional tools) and make for builds if needed
RUN apk add --no-cache bash git make g++

WORKDIR /usr/src/app
COPY package.json package-lock.json* ./
RUN npm install --production

COPY . .

EXPOSE 3000
CMD ["node", "src/index.js"]
