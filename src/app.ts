import fastify from "fastify";
import type { FastifyInstance } from "fastify";
import routes from "./routes";
import { env } from "./config/env";

const app: FastifyInstance = fastify({
    logger: {
        level: env.NODE_ENV === "dev" ? "info" : "error",
    },
})

app.register(routes, {
    prefix: '/api'})

export default app;