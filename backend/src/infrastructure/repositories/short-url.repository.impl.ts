import type { ShortenerUrlDatasource } from "../../domain/datasources"
import type { ShortenerUrlRepository } from "../../domain/repositories"

export class ShortenerUrlRepositoryImpl implements ShortenerUrlRepository {
	constructor(
		private readonly shortenerUrlDatasource: ShortenerUrlDatasource,
	) {}

	generatesShortUrl(longUrl: string): Promise<string> {
		return this.shortenerUrlDatasource.generatesShortUrl(longUrl)
	}
	getLongUrl(shortUrl: string): Promise<string> {
		return this.shortenerUrlDatasource.getLongUrl(shortUrl)
	}
}
