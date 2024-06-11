import Image from "next/image";

import CTALink from "./CTALink";
import logo from "@/public/TopCoorperative_logo.png";

type Props = {
  CTALabel?: CTAAuthLabel;
  CTAHref?: string;
};

export default function NavBar({
  CTALabel = 'Sign In',
  CTAHref = '/signin',
}: Props) {
  return (
    <header className="px-3 py-2 border-b flex flex-row justify-between">
      <Image
        src={logo}
        alt="Website Logo"
        width={100}
        // height={5}
      />
      <nav className="flex">
        <CTALink
          label={CTALabel}
          link={CTAHref}
        />
      </nav>
    </header>
  );
}
