import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";

type ServerOptions = {
	port?: number;
	routes: Hono;
};

export class Server {
	private app: Hono;
	private readonly port: number;
	routes: Hono;
	constructor({ port = 3000, routes }: ServerOptions) {
		this.app = new Hono({ strict: false });
		this.port = port;
		this.routes = routes;
	}

	start() {
		console.log(`Server is running on http://localhost:${this.port}`);
		this.app.use(logger());
		this.app.get("/", (c) => c.text("Short-Url API"));
		this.app.route("/api", this.routes);
		serve({
			port: this.port,
			fetch: this.app.fetch,
		});
	}
}