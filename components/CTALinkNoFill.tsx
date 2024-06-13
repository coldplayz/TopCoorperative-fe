import Link from "next/link";

type Props = {
  href: string;
  label: string;
};

export default function CTALinkNoFill({
  href,
  label,
}: Props) {
  return (
    <Link
      className="font-bold text-accent-foreground"
      href={href}
    >
      {label}
    </Link>
  );
}
