import Link from "next/link";
import { GrLinkNext } from 'react-icons/gr';

import { Button } from "@/components/ui/button";

type Props = {
  label: 'Sign In' | 'Sign Up' | 'Get Started';
  link: string;
};

export default function CTALink({ label, link }: Props) {
  let twClasses = 'flex justify-between items-center px-3 py-1.5 rounded-lg ';

  switch (label) {
    case 'Sign In':
    case 'Sign Up':
    case 'Get Started':
      twClasses += 'bg-blue-950 hover:bg-blue-800 text-white';
      break;
    default:
      twClasses += 'bg-white hover:bg-grey-300 border';
  }


  return (
    <div>
      <Button asChild>
        <Link
          href={link}
          // className={twClasses}
        >
          {label}
          <GrLinkNext className="ml-3" />
        </Link>
      </Button>
    </div>
  );
}
