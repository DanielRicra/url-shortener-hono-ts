export abstract class ShortenerUrlDatasource {
	abstract generatesShortUrl(longUrl: string): Promise<string>
	abstract getLongUrl(shortUrl: string): Promise<string>
}
