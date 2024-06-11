import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z.string()
    .trim()
    .email({ message: 'Invalid email address' }),
  password: z.string()
    .trim()
    .min(2, {
      message: 'Password cannot be empty',
    }), // TODO: increase minimum string length
});

export const SignupFormSchema = z.object({
  firstName: z.string()
    .trim()
    .min(2, {
      message: 'First name cannot be empty',
    }), // TODO: increase minimum string length
  lastName: z.string()
    .trim()
    .min(2, {
      message: 'Last name cannot be empty',
    }), // TODO: increase minimum string length
  email: z.string()
    .trim()
    .email({ message: 'Invalid email address' }),
  password: z.string()
    .trim()
    .min(2, {
      message: 'Password cannot be empty',
    }), // TODO: increase minimum string length
});

export type LoginFormSchema = z.infer<typeof LoginFormSchema>;

export type SignupFormSchema = z.infer<typeof SignupFormSchema>;
