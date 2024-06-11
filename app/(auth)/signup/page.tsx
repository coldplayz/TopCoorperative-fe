import Link from "next/link";

import SignupForm from "@/components/SignupForm";
import { ClientRoutes } from "@/app.config";

export default function Signup() {
  return (
    <div className="w-full h-full p-4 flex flex-col justify-center items-center gap-20 border rounded-lg bg-gray-50">
      <div className="flex flex-col justify-center items-center gap-2">
        <h1 className="text-primary text-3xl font-bold">Sign Up</h1>
        <p className="text-muted-foreground text-pretty text-center">Please enter your details below.</p>
      </div>

      <div className="w-full flex flex-col justify-center items-center gap-6">
        <SignupForm />

        <p className="text-muted-foreground text-pretty text-center">Already have an account? <Link className="font-bold text-accent-foreground" href={ClientRoutes.signin}>Sign In</Link></p>
      </div>
    </div>
  );
}
