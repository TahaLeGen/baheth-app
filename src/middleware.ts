import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Simple JWT verification without external dependencies
function verifyToken(token: string) {
  try {
    // Simple base64 decode of JWT payload (for demo purposes)
    const parts = token.split('.')
    if (parts.length !== 3) return null
    
    const payload = JSON.parse(atob(parts[1]))
    
    // Check if token is expired
    if (payload.exp && payload.exp < Date.now() / 1000) {
      return null
    }
    
    return payload
  } catch {
    return null
  }
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Skip middleware for static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Get token from cookie or header
  const token = request.cookies.get('token')?.value

  // Define protected and auth routes
  const isProtectedRoute = pathname.startsWith('/dashboard')
  const isAuthRoute = pathname.startsWith('/auth/')

  // Redirect to sign-in if accessing protected route without token
  if (isProtectedRoute && !token) {
    const url = new URL('/auth/sign-in', request.url)
    url.searchParams.set('redirect', pathname)
    return NextResponse.redirect(url)
  }

  // Handle protected routes with token
  if (isProtectedRoute && token) {
    const payload = verifyToken(token)
    
    // Invalid token - redirect to sign-in
    if (!payload || !payload.role) {
      const url = new URL('/auth/sign-in', request.url)
      const response = NextResponse.redirect(url)
      response.cookies.delete('token')
      return response
    }

    const userRole = payload.role

    // Restrict admin-only sections
    if (userRole !== 'admin' && (pathname.startsWith('/dashboard/researchers') || pathname.startsWith('/dashboard/providers'))) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    // Allow all other dashboard routes
    return NextResponse.next()
  }

  // Handle auth routes with valid token - redirect to dashboard
  if (isAuthRoute && token) {
    const payload = verifyToken(token)
    if (payload && payload.role) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}


