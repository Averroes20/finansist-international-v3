import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import validationLogin from '@/lib/validation/schema-login';
import { prismaClient } from '@/lib/database/connection';
import bcrypt from 'bcryptjs';

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: 'jwt' },
  secret: process.env.AUTH_SECRET,
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

          // Check password
          const matchedPassword = bcrypt.compareSync(credentials?.password as string, user.password);

          if (!matchedPassword) {
            console.error('Invalid password');
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
      const privateRoutes = ['/admin/blogs', '/admin/portfolio', '/admin/review'];
      const { pathname } = nextUrl;

      if (!isLoggedIn && (privateRoutes.includes(pathname) || pathname.startsWith('/api/auth/signout'))) {
        return Response.redirect(new URL('/', nextUrl));
      }

      if (isLoggedIn && pathname.startsWith('/auth/signin/z6ByYZ6H8N')) {
        return Response.redirect(new URL('/', nextUrl));
      }
      return true;
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
    signIn: '/auth/signin/z6ByYZ6H8N',
  },
});
