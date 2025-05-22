FROM node:18

RUN apt-get update && apt-get install -y postgresql-client

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .

COPY wait-for-postgres.sh /wait-for-postgres.sh
RUN chmod +x /wait-for-postgres.sh

CMD ["sh", "-c", "/wait-for-postgres.sh && npm run server"]