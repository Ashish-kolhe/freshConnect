import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // For demo - allow all routes
  return NextResponse.next()
}

export const config = {
  matcher: ["/vendor/:path*", "/supplier/:path*"],
}
