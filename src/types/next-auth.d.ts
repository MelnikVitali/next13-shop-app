import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      role?: string | undefined | null;
      id?: string | undefined | null;
      role?: string | undefined | null;
      createdAt?: string | undefined | null;
    } & DefaultSession['user'];
  }
}