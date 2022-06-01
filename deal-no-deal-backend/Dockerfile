FROM node:18

WORKDIR /app

RUN npm install -g @nestjs/cli

COPY . .

RUN yarn install --production --ignore-scripts

RUN yarn prisma generate

RUN yarn build

CMD ["nest", "start"]

EXPOSE 3000
