import Link from "next/link";
import Image from "next/image";
import { GrLinkNext } from "react-icons/gr";

import CTALink from "@/components/CTALink";
import hero from "@/public/webnotes_hero.png";

export default function Page() {
  // return <h1 className="px-3 py-1 bg-gray-50 text-gray-800 rounded-md shadow-md">Hello, Next.js!</h1>

  return (
    <div className="w-full flex flex-col justify-center items-center gap-6">
      <h1 className="text-3xl text-gray-900 font-bold tracking-tight">Welcome to WebTodos!</h1>

      <p className="text-gray-500">Want to be part of a supportive community? Look no further as TopCoorporative has you covered. Get very affordable loans and pursue that next project. Just a click away!</p>

      <CTALink
        label="Get Started"
        link="/signin"
      />

      <Image
        src={hero}
        alt="Hero image"
      />
    </div>
  );
}
