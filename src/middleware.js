import { NextResponse } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(request) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    // Protected routes that need auth
    // '/explore',
    // '/explore/:path*',
    '/generate',
    '/generate/:path*',
    '/dashboard',
    '/dashboard/:path*'
  ]
}
