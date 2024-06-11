type LoginFormState = {
  errors?: {
    email?: string[];
    password?: string[];
  },
  message?: string,
  apiError?: string,
};

type SignupFormState = {
  errors?: {
    firstName?: string[];
    lastName?: string[];
    email?: string[];
    password?: string[];
  },
  message?: string,
  apiError?: string,
};

type CTAAuthLabel = 'Sign In' | 'Sign Up' | 'Get Started';

type QueryObj = Record<string, string>;

type ClientRouteKeys = 'marketing' | 'dashboard' | 'signin' | 'signup';

type ClientRoutes = {
  [k in keyof ClientRouteKeys]: any;
};