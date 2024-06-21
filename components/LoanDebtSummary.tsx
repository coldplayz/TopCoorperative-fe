import { getMe } from "@/lib/apis/backend/get-me";
import { getUnpaidLoans } from "@/lib/apis/backend/get-unpaid-loans";
import CTALink from "@/components/CTALink";
import { IoTimeOutline } from "react-icons/io5";
// import { UserContext } from "@/lib/contexts/user-context";

export default async function LoanDebtSummary() {
  // const me = await getMe();
  const unpaidLoans = await getUnpaidLoans();
  // const me = useContext(UserContext);

  console.log(unpaidLoans); // SCAFF

  return (
    <div className="p-2 w-full flex flex-col gap-4 justify-center items-center bg-gray-50 shadow-md rounded-lg">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-xl text-primary">Loan Debt</h1>
        <p className="text-muted-foreground">Your loan debt summary.</p>
      </div>

      <div className="flex flex-col justify-center items-center">
        <p className="text-3xl text-primary font-bold">
          {unpaidLoans?.requestId?.amountRepayable || '#220,000'}
        </p>
        <p className="flex justify-center items-center text-muted-foreground text-sm"><IoTimeOutline className="mr-2"/> June 13, 2025</p>
      </div>

      <div className="w-full">
        <CTALink classes="w-full" label="Pay Up" link="/dashboard" />
      </div>

      {/* <p>User: {me?.email} | {me?.role} | {me?.id}</p> */}
    </div>
  );
}
