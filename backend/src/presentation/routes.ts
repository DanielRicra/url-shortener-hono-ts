import { Hono } from "hono"
import { CustomError } from "../domain/errors"
import { ShortenerUrlRoute } from "./short-url"
import { ShortenerUrlRepositoryImpl } from "../infrastructure/repositories"
import { ShortenerUrlDatasourceImpl } from "../infrastructure/datasources"

export class AppRoutes {
	static get routes(): Hono {
		const router = new Hono()

		const shortenerUlrDatasource = new ShortenerUrlDatasourceImpl()
		const shortenerUrlRepository = new ShortenerUrlRepositoryImpl(
			shortenerUlrDatasource,
		)
		const shortenerUrlRoute = new ShortenerUrlRoute(shortenerUrlRepository)

		router.get("/", (c) => c.text("Api routes: /shorten-url, /:shortUrl"))
		router.route("/", shortenerUrlRoute.routes())
		router.onError((err, c) => {
			if (err instanceof CustomError) {
				return c.json({ error: err.message }, err.statusCode)
			}
			return c.json({ error: "Internal Server Error" }, 500)
		})

		return router
	}
}
