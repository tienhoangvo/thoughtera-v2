import { NextRequest } from 'next/server'
import { NextResponse as res } from 'next/server'
import { verifyAuth } from './lib/server/utils/auth'
import { ACCESS_TOKEN } from './lib/server/utils/constants'

export const middleware = async (req: NextRequest) => {
  const { nextUrl } = req
  const accessToken = req.cookies.get(ACCESS_TOKEN)

  if (!accessToken) {
    if (!nextUrl.pathname.startsWith('/sign-in')) {
      const signInUrl = new URL(`/sign-in`, req.url)
      signInUrl.searchParams.set('callbackUrl', nextUrl.pathname)
      return res.redirect(signInUrl)
    }
  }

  if (accessToken) {
    if (nextUrl.pathname.startsWith('/sign-in')) {
      const callbackPathname = nextUrl.searchParams.get('callbackUrl') || '/'
      const callbackUrl = new URL(callbackPathname, req.url)
      return res.redirect(callbackUrl)
    }
    const verified = await verifyAuth(accessToken).catch((err) => {
      console.error(err.message)
    })

    if (!verified) {
      const signInUrl = new URL(`/sign-in`, req.url)
      signInUrl.searchParams.set('callbackUrl', nextUrl.pathname)
      return res.redirect(signInUrl)
    }
  }
}

export const config = {
  matcher: [
    '/my-stories/:path*',
    '/notifications',
    '/bookmarks',
    '/new-story',
    '/sign-in',
  ],
}
