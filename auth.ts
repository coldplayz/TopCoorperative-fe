import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { cookies } from "next/headers";

import {
  ops,
  getApiEndpoint,
  CredentialsError,
} from "@/app.config";

async function getUser(email: string, password: string) {
  const url = getApiEndpoint(ops.auth.signin);
  const reqBody = { email, password };

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reqBody),
    // cache: 'no-store',
  });

  if (!res.ok || res.status >= 400) {
    // likely unauthorized
    // log('loginUser action:', await res.text()); // SCAFF
    throw new CredentialsError('Email and/or password incorrect');
  }

  // Authorization successful

  const resData = await res.json();

  // log('login response:', resData.data); // SCAFF

  // Set client-inaccessible token cookies
  cookies().set({
    name: 'accessToken',
    value: resData.data.accessToken,
    httpOnly: true, // only accessible on the server
    secure: true, // over https (or localhost) only
    path: '/',
  });

  cookies().set({
    name: 'refreshToken',
    value: resData.data.refreshToken,
    httpOnly: true, // only accessible on the server
    secure: true, // over https (or localhost) only
    path: '/',
  });

  return resData.data;
}
 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize({ email, password }) {
        const user = await getUser(email as string, password as string);
        if (!user) return null;

        return user;
      },
    }),
  ],
});
