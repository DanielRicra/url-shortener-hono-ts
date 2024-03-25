import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"
import { object, string } from "zod"

import type { ShortenerUrlRepository } from "../../domain/repositories"
import type { Variables } from "./types"
import type { Database } from "../../data/turso"

const formSchema = object({
	longUrl: string().url("Invalid url"),
})
const getShortUrlSchema = object({
	shorturl: string(),
})

export class ShortenerUrlRoute {
	constructor(private shortenerUrlRepository: ShortenerUrlRepository) {}
	routes(): Hono<{ Variables: Variables }> {
		const router = new Hono<{ Variables: Variables }>()

		router.post("/shorten-url", zValidator("json", formSchema), async (c) => {
			const db: Database = c.get("db")

			const { longUrl } = c.req.valid("json")

			const shortenedUrl = await this.shortenerUrlRepository.generatesShortUrl(
				longUrl,
				db,
			)
			return c.json({ shortenedUrl })
		})
		router.get(
			"/:shorturl",
			zValidator("param", getShortUrlSchema),
			async (c) => {
				const db: Database = c.get("db")

				const { shorturl: shortUrl } = c.req.valid("param")

				const longUrl = await this.shortenerUrlRepository.getLongUrl(
					shortUrl,
					db,
				)
				return c.redirect(longUrl, 301)
			},
		)

		return router
	}
}
