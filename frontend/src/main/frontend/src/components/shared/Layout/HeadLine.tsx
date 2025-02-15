import React from "react"

interface PageProps {
  children: React.ReactNode;
}

const HeadLine: React.FC<PageProps> = ({ children }) => {
  return (
    <h1 className="w-full text-center text-4xl md:text-5xl font-extrabold mb-2
                     bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500
                     bg-clip-text text-transparent">
      {children}
    </h1>
  )
}

export default HeadLine