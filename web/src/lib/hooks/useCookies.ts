import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { cookies } from 'next/headers'

export default function useCookies() {
	const cookieList = cookies()

	const getByKey = (key: string) => {
		return cookieList.get(key)?.value
	}

	const setCookie = (options: RequestCookie) => {
		return cookieList.set(options)
	}

	return { getByKey, setCookie }
}
