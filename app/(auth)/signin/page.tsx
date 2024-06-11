import Link from "next/link";

import SigninForm from "@/components/SigninForm";

export default function Login() {
  return (
    <div className="w-full h-full p-4 flex flex-col justify-center items-center gap-20 border rounded-lg bg-gray-50">
      <div className="flex flex-col justify-center items-center gap-2">
        <h1 className="text-primary text-3xl font-bold">Sign In</h1>
        <p className="text-muted-foreground text-pretty text-center">Please enter your login credentials below.</p>
      </div>

      <div className="w-full flex flex-col justify-center items-center gap-6">
        <SigninForm />

        <p className="text-muted-foreground text-pretty text-center">Don&apos;t have an account yet? <Link className="font-bold text-accent-foreground" href="/signup">Sign Up</Link></p>
      </div>
    </div>
  );
}
