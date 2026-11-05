FROM oven/bun:1

WORKDIR /usr/src/app

COPY package.json bun.lock ./
RUN bun install

COPY . .

RUN bunx prisma generate
RUN bun run build

EXPOSE 5000

CMD ["bun", "run", "start:prod"]
