"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { AuthError } from "next-auth";

import {
  LoginFormSchema,
  SignupFormSchema,
} from "@/lib/zod-schemas";
import { delay } from "@/lib/utils";
import {
  getApiEndpoint,
  ops,
  ClientRoutes,
  CredentialsError,
} from "@/app.config";
import { signIn } from "@/auth";

const log = console.log // SCAFF

export async function loginUser(
  currState: LoginFormState,
  formData: FormData
) {

  // await delay(2000); // SCAFF

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

  try {
    await signIn('credentials', reqBody);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { apiError: 'Invalid credentials.' };
        default:
          return { apiError: 'Something went wrong.' };
      }
    }

    if (error instanceof CredentialsError) {
      return { apiError: 'Email and/or password incorrect' };
    }

    throw error;
  }

  /*
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
    // cache: 'no-store',
  });

  if (!res.ok || res.status >= 400) {
    // likely unauthorized
    // log('loginUser action:', await res.text()); // SCAFF
    return { apiError: 'Email and/or password incorrect' };
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

  redirect(ClientRoutes.dashboard.home);
  */
}

export async function signupUser(
  currState: SignupFormState,
  formData: FormData
) {

  // await delay(2000); // SCAFF

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
    // cache: 'no-store',
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

/**
 * Make requests to the backend server.
 */
export async function fetchBE(
  url: string,
  method: BackendMethods,
  body: string | object = '',
  options: FetchOptsBE = {}
) {
  const allCookies = cookies().getAll();
  const atkn = cookies().get('accessToken')?.value;

  log('#####\n', atkn, '===', allCookies, '#####'); // SCAFF

  return fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${atkn}`,
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: options.cache ? 'force-cache' : 'no-store',
  });
}
