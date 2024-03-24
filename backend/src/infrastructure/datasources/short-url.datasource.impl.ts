import { BcryptAdapter } from "../../config"
import type { ShortenerUrlDatasource } from "../../domain/datasources"
import { CustomError } from "../../domain/errors"

const data = new Map<string, string>()

type HashFunction = (s: string) => string

export class ShortenerUrlDatasourceImpl implements ShortenerUrlDatasource {
	constructor(private readonly hashUrl: HashFunction = BcryptAdapter.hash) {}

	generatesShortUrl(longUrl: string): Promise<string> {
		return new Promise((resolve, reject) => {
			const hash = this.hashUrl(longUrl + Date.now().toString())
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
