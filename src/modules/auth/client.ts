import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './config';
import { AuthCredentials } from './types';

const authorize = async ({
  email,
  password,
  type,
}: Partial<AuthCredentials>): Promise<User | null> => {
  if (!email || !password) return null;

  switch (type) {
    case 'login': {
      // login logic will be here
      break;
    }

    case 'register': {
      // register logic will be here
      break;
    }

    default:
      return null;
  }
};

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [Credentials({ authorize })],
});
