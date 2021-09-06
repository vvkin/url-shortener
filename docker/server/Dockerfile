FROM node:lts-alpine AS base
WORKDIR /usr/src/app
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=yarn.lock,target=yarn.lock \
    yarn --frozen-lockfile

FROM base AS build
RUN --mount=type=bind,source=src,target=src \
    --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=tsconfig.json,target=tsconfig.json \
    --mount=type=bind,source=/usr/src/app/node_modules,target=node_modules,from=base \
    yarn build

FROM base AS development
ENV NODE_ENV=development
COPY package.json tsconfig.json .sequelizerc ./
COPY src src
RUN --mount=target=.,from=base
CMD ["yarn", "start:dev"]

FROM build AS production
ENV NODE_ENV=production
COPY package.json tsconfig.json paths.js .sequelizerc ./
RUN --mount=target=.,from=base \
    --mount=target=.,from=build
CMD ["yarn", "start:prod"]
