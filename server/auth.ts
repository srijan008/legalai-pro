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
  async session({ session, token }) {
    // Ensure session.user exists before assigning id
    type UserWithID = DefaultSession["user"] & { id?: string }
    if (!session.user) {
      session.user = {
        id: token.id as string,
        name: token.name as string | undefined,
        email: token.email as string | undefined
      } as UserWithID
    } else {
      (session.user as UserWithID).id = token.id as string
    }
    return session
  },
  async jwt({ token, user }) {
    if (user) {
      token.id = (user as unknown as { id?: string }).id ?? token.id
    }
    return token
  }
},
  pages: {
    signIn: "/auth/signin"
  }
}
