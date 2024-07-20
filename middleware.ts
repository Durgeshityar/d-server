import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const protectedRoutes = createRouteMatcher(['/'])

const publicRoute = createRouteMatcher(['/api/uploadthing'])

export default clerkMiddleware((auth, req) => {
  if (protectedRoutes(req) && !publicRoute(req)) auth().protect()
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
