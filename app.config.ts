import { join } from "path";
// import { join } from "@/lib/utils";
import { URL, URLSearchParams } from "url";

export const FRONTEND_HOST = process.env.FRONTEND_HOST || 'http://localhost:3000';
export const BACKEND_HOST = process.env.BACKEND_HOST || 'http://localhost:3456';

export const API_PREFIX = process.env.API_PREFIX || '/api/v1';

export const MAX_BREADCRUMB_ITEMS = 3;

export const ops = {
  requests: {
    create: 'createRequest',
    find: 'findRequests',
    findOne: 'findRequest',
    edit: 'editRequest',
    delete: 'deleteRequest',
  },
  loans: {
    findAll: 'findLoans',
    findOne: 'findLoan',
    edit: 'editLoan',
    delete: 'deleteLoan',
  },
  users: {
    create: 'createUser',
    find: 'findUsers',
    findMe: 'findMe',
    edit: 'editUser',
    delete: 'deleteUser',
  },
  auth: {
    signin: 'signin',
    signout: 'signout',
  },
};

export const ClientRoutes = {
  marketing: '/',
  signin: '/signin',
  signup: '/signup',
  dashboard: {
    home: '/dashboard',
    pendingReqs: '/dashboard/requests/pending',
    approvedReqs: '/dashboard/requests/approved',
    declinedReqs: '/dashboard/requests/declined',
    unpaidLoans: 'dashboard/loans/unpaid',
    paidLoans: 'dashboard/loans/paid',
  },
};

/**
 * Returns a URL with specified query string attached.
 */
function getUrl(uri: string, queryObj: QueryObj = {}) {
  const searchParams = new URLSearchParams(queryObj);

  const url = new URL(uri);
  url.search = searchParams.toString();

  return url.toString();
}

/**
* Single source of truth for backend API endpoint addresses.
*/
export function getApiEndpoint(
  op: string,
  slug: string = '',
  queryObj: QueryObj = {}
) {
  const uri = join(BACKEND_HOST, API_PREFIX);

  switch (op) {
    case ops.requests.create:
    case ops.requests.find:
    case ops.requests.edit:
    case ops.requests.delete:
      return getUrl(join(uri, '/requests', slug), queryObj);
    case ops.loans.findAll:
    case ops.loans.findOne:
    case ops.loans.edit:
    case ops.loans.delete:
      return getUrl(join(uri, '/loans', slug), queryObj);
    case ops.users.findMe:
      return getUrl(join(uri, '/users/me'));
    case ops.users.create:
    case ops.users.find:
    case ops.users.edit:
    case ops.users.delete:
      return getUrl(join(uri, '/users', slug), queryObj);
    case ops.auth.signin:
      return getUrl(join(uri, '/auth/signin'));
    case ops.auth.signout:
      return getUrl(join(uri, '/auth/signout'));
    default:
      throw new Error(`getApiEndpoint: Endpoint '${op}' does not exist`);
  }
}

const config = {
  BACKEND_HOST,
  API_PREFIX,
  getApiEndpoint,
  ops,
};

export default config;
