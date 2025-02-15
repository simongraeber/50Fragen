import React from "react"

interface PageProps {
  children: React.ReactNode;
}

const Page: React.FC<PageProps> = ({ children }) => {
  return (
    <div className="relative flex flex-col items-center justify-start min-h-[calc(100vh-64px)]
                bg-gradient-to-b from-[hsl(var(--background))] to-[hsl(var(--muted))]
                text-[hsl(var(--foreground))] px-4 sm:px-0 md:px-6 lg:px-8 pt-6">
      <div className="container mx-auto max-w-screen-xl">
        {children}
      </div>
    </div>
  )
}

export default Page