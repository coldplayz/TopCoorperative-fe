import {
  getApiEndpoint,
  ops,
} from "@/app.config";
import { fetchBE } from "@/lib/actions";

const log = console.log; // SCAFF;

export async function getUnpaidLoans() {
  const query = {
    hasPaid: 'false',
  };

  const res = await fetchBE(
    getApiEndpoint(ops.loans.findAll, undefined, query),
    'GET',
  );

  const data = await res.json();
  // log(data); // SCAFF

  return data.data;
}
