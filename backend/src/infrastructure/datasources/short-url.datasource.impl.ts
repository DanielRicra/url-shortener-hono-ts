import type { ShortenerUrlDatasource } from "../../domain/datasources"
import { createHmac } from "node:crypto"
import { CustomError } from "../../domain/errors"
import { envs } from "../../config"

const data = new Map<string, string>()

export class ShortenerUrlDatasourceImpl implements ShortenerUrlDatasource {
	generatesShortUrl(longUrl: string): Promise<string> {
		return new Promise((resolve, reject) => {
			const hash = createHmac("sha256", envs.HASH_SECRET)
				.update(longUrl + Date.now().toString())
				.digest("base64")
			const short = hash.slice(-6)

			const existing = data.get(short)
			if (existing)
				return reject(CustomError.internalServerError("Key already exists"))

			data.set(short, longUrl)
			resolve(short)
		})
	}
	getLongUrl(shortUrl: string): Promise<string> {
		return new Promise((resolve, reject) => {
			const long = data.get(shortUrl)
			if (!long) return reject(CustomError.notFound("Short url not found"))
			resolve(long)
		})
	}
}
