class View {
	private longUrlInput: HTMLInputElement
	private form: HTMLFormElement
	private shortenedUrlContainer: HTMLElement
	private shortUrlText: HTMLElement
	private errorContainer: HTMLElement
	private submitBtn: HTMLElement
	private copyBtn: HTMLButtonElement

	constructor() {
		this.longUrlInput = this.findElement<HTMLInputElement>("#longUrlInput")
		this.form = this.findElement<HTMLFormElement>("#form")
		this.shortenedUrlContainer = this.findElement("#short-url-container")
		this.shortUrlText = this.findElement("#short-url")
		this.errorContainer = this.findElement("#error-container")
		this.submitBtn = this.findElement("#submit-btn")
		this.copyBtn = this.findElement("#copy-btn")

		this.toggleShowError({ shouldShow: false })
	}

	bindFormEvent(handler: (e: SubmitEvent) => void) {
		this.form.addEventListener("submit", handler)
	}

	bindCopyToClipboardEvent(handler: (e: MouseEvent) => void) {
		this.copyBtn.addEventListener("click", handler)
	}

	get longUrl(): string {
		return this.longUrlInput.value
	}

	showShortenedUrlContainer(shortenedUrl: string) {
		this.shortenedUrlContainer.classList.remove("hidden")
		this.shortUrlText.textContent = shortenedUrl
	}

	toggleShowError({
		errorMessage,
		shouldShow = true,
	}: { errorMessage?: string; shouldShow?: boolean }) {
		if (shouldShow) {
			this.errorContainer.classList.remove("hidden")
			this.errorContainer.innerHTML = `<span>${errorMessage}</span>`
		} else {
			this.errorContainer.classList.add("hidden")
			this.errorContainer.innerHTML = ""
		}
	}

	toggleLoadingStatus(shouldShow = true) {
		if (shouldShow) {
			this.submitBtn.classList.add("loading")
		} else {
			this.submitBtn.classList.remove("loading")
		}
	}

	private findElement<T extends HTMLElement>(selector: string): T {
		const element = document.querySelector<T>(selector)
		if (!element) throw new Error(`No such element: ${selector} in document`)
		return element
	}
}

export default View
