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

type CTAAuthLabel = 'Sign In' | 'Sign Up' | 'Sign Out' | 'Get Started';
type CTALinkLabel = CTAAuthLabel | 'Pay Up' | 'Request Loan';

type QueryObj = Record<string, string>;

type ClientRouteKeys = 'marketing' | 'dashboard' | 'signin' | 'signup';

type ClientRoutes = {
  [k in keyof ClientRouteKeys]: any;
};

type BackendMethods = 'GET' | 'POST' | 'PUT' | 'DELETE';

type FetchOptsBE = {
  cache?: boolean;
};
