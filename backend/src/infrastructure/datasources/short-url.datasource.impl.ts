import { eq } from "drizzle-orm"
import { BcryptAdapter } from "../../config"
import { type Database, urls } from "../../data/turso"
import type { ShortenerUrlDatasource } from "../../domain/datasources"
import { CustomError } from "../../domain/errors"

type HashFunction = (s: string) => string

export class ShortenerUrlDatasourceImpl implements ShortenerUrlDatasource {
	constructor(private readonly hashUrl: HashFunction = BcryptAdapter.hash) {}

	async generatesShortUrl(longUrl: string, db: Database): Promise<string> {
		try {
			const hash = this.hashUrl(longUrl + Date.now().toString())
			const short = hash.slice(-6)

			// Save the  short url in db
			await db.insert(urls).values({ shortUrl: short, longUrl })
			return short
		} catch (error) {
			console.log({ where: "generateShortUrl datasource impl", error })
			throw error
		}
	}
	async getLongUrl(shortUrl: string, db: Database): Promise<string> {
		try {
			const long = await db
				.select()
				.from(urls)
				.where(eq(urls.shortUrl, shortUrl))
				.limit(1)

			if (!long) throw CustomError.notFound("Short url not found")

			return long[0].longUrl
		} catch (error) {
			console.log({ where: "getLongUrl datasource impl", error })
			throw error
		}
	}
}
