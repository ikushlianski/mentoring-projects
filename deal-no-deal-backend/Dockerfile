FROM node:18 as dev

WORKDIR /app

RUN npm install -g @nestjs/cli

COPY "package.json" .
COPY "yarn.lock" .

RUN yarn install --ignore-scripts --frozen-lockfile
RUN yarn cache clean

COPY . .

RUN yarn prisma generate --schema ./src/db/prisma/schema.prisma

EXPOSE 3000


FROM node:18 as staging

WORKDIR /app

RUN npm install -g @nestjs/cli

COPY "package.json" .
COPY "yarn.lock" .

RUN yarn install --ignore-scripts --frozen-lockfile && yarn cache clean

COPY . .

RUN yarn prisma generate --schema ./src/db/prisma/schema.prisma

RUN yarn build


FROM node:18 as prod

WORKDIR /app

RUN npm install -g @nestjs/cli

COPY . .

RUN yarn install --ignore-scripts --frozen-lockfile && yarn cache clean

COPY --from=staging /app/dist ./dist

RUN yarn prisma generate --schema ./src/db/prisma/schema.prisma

EXPOSE 3000
