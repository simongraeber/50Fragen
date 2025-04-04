import React from "react"

interface PageProps {
  children: React.ReactNode;
}

const Page: React.FC<PageProps> = ({ children }) => {
  return (
    <div className="bg-gradient-to-b from-[hsl(var(--background))] to-[hsl(var(--muted))]
             text-[hsl(var(--foreground))] min-h-[calc(100vh-64px)] overflow-hidden">
      <div className="relative mx-auto px-0 py-4 xs:p-6 flex flex-col items-center justify-start max-w-screen-xl">
        {children}
      </div>
    </div>
  )
}

export default Page