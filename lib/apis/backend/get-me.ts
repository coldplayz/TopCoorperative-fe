import {
  getApiEndpoint,
  ops,
} from "@/app.config";
import { fetchBE } from "@/lib/actions";

const log = console.log; // SCAFF;

export async function getMe() {
  const res = await fetchBE(
    getApiEndpoint(ops.users.findMe),
    'GET',
  );

  const data = await res.json();
  // log(data); // SCAFF

  return data.data;
}
