import { createClient } from "@libsql/client"
import { drizzle } from "drizzle-orm/libsql"
import { Hono } from "hono"
import { cors } from "hono/cors"
import { logger } from "hono/logger"

import type { Envs, Variables } from "./short-url/types"

type ServerOptions = {
	port?: number
	routes: Hono
}

export class Server {
	private app: Hono<{ Bindings: Envs; Variables: Variables }>
	private readonly port: number
	private routes: Hono

	constructor({ port = 3000, routes }: ServerOptions) {
		this.app = new Hono<{ Bindings: Envs; Variables: Variables }>({
			strict: false,
		})
		this.port = port
		this.routes = routes

		this.start()
	}

	private start() {
		console.log("Server is running on http://localhost:8787")
		this.app.use(logger())
		this.app.use(cors())
		this.app.use("*", async (c, next) => {
			const client = createClient({
				url: c.env.TURSO_DB_URL,
				authToken: c.env.TURSO_TOKEN,
			})
			const db = drizzle(client)
			c.set("db", db)
			await next()
		})
		this.app.get("/", (c) => c.text("Short-Url API"))
		this.app.route("/", this.routes)
	}

	get getApp() {
		return this.app
	}
}
