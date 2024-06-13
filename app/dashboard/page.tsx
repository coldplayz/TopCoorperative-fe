import { Suspense } from "react";

import LoanDebtSummary from "@/components/LoanDebtSummary";

export default async function Page() {
  return (
    <div className="w-full p-6 flex flex-col justify-center items-center gap-6">
      <Suspense fallback={<p>Loading...</p>}>
        <LoanDebtSummary />
      </Suspense>

      {/* <p>Loan requests summary</p> */}
    </div>
  );
}
