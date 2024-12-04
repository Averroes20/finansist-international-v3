import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import validationLogin from '@/lib/validation/schema-login';
import { prismaClient } from '@/lib/database/connection';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        let user = null;

        const parsedCredentials = validationLogin.safeParse(credentials);
        if (!parsedCredentials.success) {
          console.error('Invalid credentials:', parsedCredentials.error.errors);
          return null;
        }

        try {
          user = await prismaClient.user.findUnique({
            where: { email: credentials?.email as string | undefined },
          });

          if (!user) {
            console.log('User not found');
            return null;
          }

          const isPasswordValid = credentials?.password === user.password;
          if (!isPasswordValid) {
            console.log('Invalid password');
            return null;
          }

          return {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
          };
        } catch (error) {
          console.error('Error verifying credentials:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    authorized({ request: { nextUrl }, auth }) {
      const isLoggedIn = !!auth?.user;
      const { pathname } = nextUrl;
      if (pathname.startsWith('/auth/signin') && isLoggedIn) {
        return Response.redirect(new URL('/', nextUrl));
      }
      return !!auth;
    },
    jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id as string;
      }
      if (trigger === 'update' && session) {
        token = { ...token, ...session };
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
});
