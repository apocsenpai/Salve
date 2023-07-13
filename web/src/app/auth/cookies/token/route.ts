import useCookies from '@/lib/hooks/useCookies'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url)

	const { setCookie } = useCookies()

	const token = searchParams.get('token')
	const redirectPath = searchParams.get('redirect')

	setCookie({
		name: 'token',
		value: token || '',
	})

	return redirect(redirectPath || '/')
}
