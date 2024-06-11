import '@/app/ui/global.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <main className="p-8">{children}</main>
      </body>
    </html>
  )
}
