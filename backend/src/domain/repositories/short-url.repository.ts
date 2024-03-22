export abstract class ShortenerUrlRepository {
	abstract generatesShortUrl(longUrl: string): Promise<string>
	abstract getLongUrl(shortUrl: string): Promise<string>
}
