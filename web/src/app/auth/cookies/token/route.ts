import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const token = searchParams.get('token')
  const redirectPath = searchParams.get('redirect')

  const redirectUrl = new URL(redirectPath ? redirectPath : '/', request.url)

  const cookieExpiresInSeconds = 24 * 60 * 60

  return NextResponse.redirect(redirectUrl, {
    headers: {
      'Set-Cookie': `token=${token}; Path=/; max-age=${cookieExpiresInSeconds};`,
    },
  })
}
