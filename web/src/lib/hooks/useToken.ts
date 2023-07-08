import useCookies from './useCookies'

export default function useToken() {
	const { getByKey } = useCookies()

	const token = getByKey('token')

	return token
}
