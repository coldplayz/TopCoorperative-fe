import "@/app/ui/global.css";

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const rows = [
    { n: 1, color: 'bg-red-200' },
    { n: 2, color: 'bg-blue-200' },
    { n: 3, color: 'bg-green-200' },
    { n: 4, color: 'bg-red-200' },
    { n: 5, color: 'bg-blue-200' },
    { n: 6, color: 'bg-green-200' },
    { n: 7, color: 'bg-red-200' },
    { n: 8, color: 'bg-blue-200' },
    { n: 9, color: 'bg-green-200' },
    { n: 0, color: 'bg-red-200' },
  ];

  return (
    <html lang="en">
      <body className="grid min-h-screen grid-rows-10">
        {/*
          rows.map((row, i) => {
            return <p key={i} className={row.color}>{row.n}</p>
          })
        */}
        {/* <p className="bg-green-200">{0}</p> */}
        <p className="bg-red-200">1</p>
        <p className="row-span-2 bg-blue-200">0 and 2</p>
        <p className="bg-green-200">{3}</p>
        <p className="bg-red-200">{4}</p>
        <p className="bg-blue-200">{5}</p>
        <p className="bg-green-200">{6}</p>
        <p className="bg-red-200">{7}</p>
        <p className="bg-blue-200">{8}</p>
        <p className="bg-green-200">{9}</p>
      </body>
    </html>
  )
}
