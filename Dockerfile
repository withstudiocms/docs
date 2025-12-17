FROM node:lts AS build
RUN --mount=type=secret,id=public_github_token export PUBLIC_GITHUB_TOKEN=$(cat /run/secrets/public_github_token) && echo "Secret loaded"

WORKDIR /app
COPY . .

RUN npm install --global corepack@latest
RUN corepack enable pnpm

RUN pnpm install --frozen-lockfile
RUN pnpm run build

FROM nginx:alpine AS runtime
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080