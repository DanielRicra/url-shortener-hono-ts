import type { Database } from "../../data/turso"

export abstract class ShortenerUrlRepository {
	abstract generatesShortUrl(longUrl: string, db: Database): Promise<string>
	abstract getLongUrl(shortUrl: string, db: Database): Promise<string>
}
