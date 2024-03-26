class UrlShortenerService {
	async shortLongUrl(longUrl: string): Promise<{ shortenedUrl: string }> {
		const response = await fetch("https://shorturl.danielquispe-142.workers.dev/shorten-url", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ longUrl }),
		})
		if (!response.ok) throw new Error("Possible duplicate key ")
		return response.json()
	}
}

export default UrlShortenerService
