import type { NextAuthOptions, User as NextUser } from 'next-auth';
import GoggleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import bcrypt from 'bcryptjs';
import db from '@/database/db';
import User from '@/models/User';
import Credentials from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email:', type: 'email', required: true, placeholder: 'email@google.com' },
        password: { label: 'Password', type: 'password', required: true, placeholder: 'Password' },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        try {
          await db.connect().catch((err) => {
            throw new Error(err);
          });

          const user = await User.findOne({ email: credentials?.email });

          await db.disconnect();

          if (!user) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(credentials!.password, user.password!);

          if (!passwordsMatch) {
            return null;
          }

          return user as any;
        } catch (error) {
          console.log('Error: ', error);
        }
      },
    }),
    //https://cloud.google.com/ --> console --> APIs & services --> My Project --> Credentials --> Create OAuth client ID
    //http://localhost:3003/api/auth/callback/google
    GoggleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    //https://github.com/settings/developers
    //http://localhost:3003/api/auth/callback/github
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  // Custom Pages
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register',
  },
  // Callbacks
  session: {
    // The maximum age of the NextAuth.js issued JWT in seconds.
    // Defaults to `session.maxAge`.
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 days (4 * 60 * 60, // 4 hours ???);
    updateAge: 12 * 60 * 60, // 12 hours
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google' || account?.provider === 'github') {
        const { name, email } = user;
        try {
          await db.connect().catch((err) => {
            throw new Error(err);
          });
          const userExists = await User.findOne({ email });
          await db.disconnect();

          if (!userExists) {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/signup`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                name,
                email,
              }),
            });

            if (res.ok) {
              return user;
            }
          }
        } catch (error) {
          console.log(error);
        }
      }

      return user as any;
    },
    session: async ({ session }) => {
      try {
        if (session?.user?.email) {
          const { email } = session.user;
          await db.connect().catch((err) => {
            throw new Error(err);
          });
          const userExists = await User.findOne({ email });
          await db.disconnect();
          // If no user is found in the db, create one

          if (userExists) {
            const { role, createdAt, _id } = userExists;

            session.user = {
              ...session.user,
              id: _id.toString(),
              role,
              createdAt,
            } as NextUser;
          }
        }
        return Promise.resolve(session) as any;
      } catch (error) {
        console.log('callbacks error', error);
      }
    },
  },
};
