import { NextAuthOptions, DefaultSession } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { prisma } from "./db"
import { compare } from "bcryptjs"

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {}
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })
        if (!user || !user.passwordHash) return null
        const valid = await compare(credentials.password, user.passwordHash)
        if (!valid) return null
        return {
          id: user.id,
          email: user.email,
          name: user.name
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id   // Attach mongo ObjectId
      }
      return token
    },

    async session({ session, token }) {
      session.user.id = token.id as string  // Expose id in session
      return session
    }
  },
  pages: {
    signIn: "/auth/signin"
  }
}
