FROM node:lts-alpine
LABEL org.opencontainers.image.source="https://github.com/Norgate-AV/generator-norgate-av"

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

RUN apk update && apk upgrade

RUN pnpm add -g yo generator-norgate-av

USER node
ENTRYPOINT [ "yo", "--no-insight", "norgate-av" ]
