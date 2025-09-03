import NextAuth from "next-auth"
import type { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      return session
    },
    async jwt({ token, account }) {
      return token
    },
    async redirect({ url, baseUrl }) {
      // If signing in, redirect to services page
      if (url.includes("/api/auth/signin")) {
        return `${baseUrl}/services`
      }
      // If signing out, redirect to home page
      if (url.includes("/api/auth/signout")) {
        return baseUrl
      }
      // Allow relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allow callback URLs on the same origin
      if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
  },
  pages: {
    signIn: "/",
  },
}

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions)
