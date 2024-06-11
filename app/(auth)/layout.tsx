import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";

// TODO:
// - add metadata

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`grid min-h-screen grid-rows-12 ${inter.className} antialiased`}>

        {/* Header */}
        <div className="">
          <NavBar
            CTALabel="Sign Up"
            CTAHref="/signup"
          />
        </div>

        <main className="p-5 row-span-10">{children}</main>

        <Footer />
      </body>
    </html>
  )
}
