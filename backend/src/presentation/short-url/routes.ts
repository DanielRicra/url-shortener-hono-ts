import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"
import { object, string } from "zod"

import type { ShortenerUrlRepository } from "../../domain/repositories"

const formSchema = object({
	longUrl: string().url("Invalid url"),
})
const getShortUrlSchema = object({
	shortUrl: string(),
})

export class ShortenerUrlRoute {
	constructor(private shortenerUrlRepository: ShortenerUrlRepository) {}
	routes(): Hono {
		const router = new Hono()

		router.post("/shorten-url", zValidator("json", formSchema), async (c) => {
			const { longUrl } = c.req.valid("json")

			const shortenedUrl =
				await this.shortenerUrlRepository.generatesShortUrl(longUrl)
			return c.json({ shortenedUrl })
		})
		router.get(
			"/:shortUrl",
			zValidator("param", getShortUrlSchema),
			async (c) => {
				const { shortUrl } = c.req.valid("param")

				const longUrl = await this.shortenerUrlRepository.getLongUrl(shortUrl)
				return c.redirect(longUrl, 301)
			},
		)

		return router
	}
}
