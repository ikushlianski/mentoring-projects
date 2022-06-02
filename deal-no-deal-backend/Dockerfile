# todo move this to IaC/docker

FROM node:18

WORKDIR /app

RUN npm install -g @nestjs/cli

COPY . .

RUN yarn install --ignore-scripts --frozen-lockfile

RUN yarn prisma generate

EXPOSE 3000
