import type { Database } from "../../data/turso"
import type { ShortenerUrlDatasource } from "../../domain/datasources"
import type { ShortenerUrlRepository } from "../../domain/repositories"

export class ShortenerUrlRepositoryImpl implements ShortenerUrlRepository {
	constructor(
		private readonly shortenerUrlDatasource: ShortenerUrlDatasource,
	) {}

	generatesShortUrl(longUrl: string, db: Database): Promise<string> {
		return this.shortenerUrlDatasource.generatesShortUrl(longUrl, db)
	}
	getLongUrl(shortUrl: string, db: Database): Promise<string> {
		return this.shortenerUrlDatasource.getLongUrl(shortUrl, db)
	}
}
