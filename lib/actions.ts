"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import {
  LoginFormSchema,
  SignupFormSchema,
} from "@/lib/zod-schemas";
import { delay } from "@/lib/utils";
import {
  getApiEndpoint,
  ops,
  ClientRoutes,
} from "@/app.config";

/*
type LoginFormState = {
  errors?: {
    email?: string[];
    password?: string[];
  },
  message?: string | null,
};
*/

const log = console.log // SCAFF

// const BACKEND_HOST = process.env.BACKEND_HOST || 'http://localhost:3456';

export async function loginUser(
  currState: LoginFormState,
  formData: FormData
) {

  await delay(2000); // SCAFF

  // log(cookies().getAll()); // SCAFF

  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid fields. Log-in failed',
    };
  }

  // Make request to backend
  // console.log(validatedFields.data); // SCAFF

  const reqBody = {
    email: validatedFields.data.email,
    password: validatedFields.data.password,
  };

  const url = getApiEndpoint(ops.auth.signin);
  // log(url); // SCAFF
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reqBody),
    cache: 'no-store',
  });

  if (!res.ok || res.status >= 400) {
    // likely unauthorized
    // log('loginUser action:', await res.text()); // SCAFF
    return { apiError: 'Email and/or password incorrect' };
  }

  // Authorization successful

  const resData = await res.json();

  // Set client-inaccessible token cookies
  cookies().set({
    name: 'accessToken',
    value: resData.accessToken,
    httpOnly: true, // only accessible on the server
    secure: true, // over https (or localhost) only
    path: '/',
  });

  cookies().set({
    name: 'refreshToken',
    value: resData.refreshToken,
    httpOnly: true, // only accessible on the server
    secure: true, // over https (or localhost) only
    path: '/',
  });

  // log(resData);
  // log(ClientRoutes.dashboard.home);
  // log([...res.headers.entries()]);

  // redirect(ClientRoutes.dashboard.home);
  redirect('/dashboard');
}

export async function signupUser(
  currState: SignupFormState,
  formData: FormData
) {

  await delay(2000); // SCAFF

  const validatedFields = SignupFormSchema.safeParse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid fields. Signup failed',
    };
  }

  // Make request to backend

  const reqBody = {
    firstName: validatedFields.data.firstName,
    lastName: validatedFields.data.lastName,
    email: validatedFields.data.email,
    password: validatedFields.data.password,
  };

  const url = getApiEndpoint(ops.users.create);
  // log(url); // SCAFF
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reqBody),
    cache: 'no-store',
  });

  if (!res.ok || res.status >= 400) {
    // Likely duplicate fields (email)
    // log('loginUser action:', await res.text()); // SCAFF
    return { apiError: 'Email already registered' };
  }

  // Signup successful

  redirect(ClientRoutes.signin);

  return {};
}
