export function scrollToTop(ref: HTMLElement | null) {
	if (ref) {
		ref.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	}
}

export function scrollToBottom(ref: HTMLElement | null) {
	if (ref) {
		ref.scrollIntoView({ behavior: 'auto' })
	}
}
