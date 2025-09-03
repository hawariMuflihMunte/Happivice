import { auth } from "./lib/auth"

export default auth((req) => {
  // Protect /services route - require authentication
  if (req.nextUrl.pathname.startsWith("/services")) {
    if (!req.auth) {
      const newUrl = new URL("/", req.nextUrl.origin)
      return Response.redirect(newUrl)
    }
  }
})

export const config = {
  matcher: ["/services/:path*"],
}
