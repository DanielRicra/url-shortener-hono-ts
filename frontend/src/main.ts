import UrlShortenerService from "./http-client"
import View from "./view"

const BASE_URL = "https://shorturl.danielquispe-142.workers.dev/"

function main() {
	const urlShortenerService = new UrlShortenerService()
	const view = new View()
	let shortUrl = ""

	const onSubmit = async (e: SubmitEvent) => {
		e.preventDefault()
		view.toggleShowError({ shouldShow: false })
		view.toggleLoadingStatus()
		const longUrl = view.longUrl

		if (longUrl.length < 30) {
			view.toggleShowError({
				errorMessage: "Url already short",
				shouldShow: true,
			})
			return
		}

		try {
			const data = await urlShortenerService.shortLongUrl(longUrl)
			view.showShortenedUrlContainer(`${BASE_URL}/${data.shortenedUrl}`)
			shortUrl = data.shortenedUrl
		} catch (error) {
			view.toggleShowError({
				errorMessage: "Something wrong happen, try again later",
				shouldShow: true,
			})
		} finally {
			view.toggleLoadingStatus(false)
		}
	}

	view.bindFormEvent(onSubmit)
	view.bindCopyToClipboardEvent((e: MouseEvent) => {
		navigator.clipboard.writeText(`${BASE_URL}/${shortUrl}`)
		const button = e.target as HTMLButtonElement
		button.textContent = "Copied!"
		button.style.backgroundColor = "#646cff"

		setTimeout(() => {
			button.textContent = "Copy"
			button.style.backgroundColor = "#1a1a1a"
		}, 1500)
	})
}

document.addEventListener("DOMContentLoaded", main)
