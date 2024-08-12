FROM node:22.6.0-slim
WORKDIR /app

COPY package*.json ./

RUN npm install
COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "dev"]