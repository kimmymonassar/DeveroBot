FROM node:14.15.0-alpine3.12
WORKDIR /app
RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 4883
CMD ["npm", "run", "start"]
