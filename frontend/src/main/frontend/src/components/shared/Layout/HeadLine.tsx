import React from "react"
import clsx from "clsx"

interface PageProps {
  children: React.ReactNode;
  className?: string;
  disableDefaults?: boolean;
}

const HeadLine: React.FC<PageProps> = ({ children, className, disableDefaults }) => {
  const defaultClasses = disableDefaults
    ? ""
    : "w-full text-center text-4xl md:text-5xl font-extrabold mb-2 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 bg-clip-text text-transparent"

  return <h1 className={clsx(defaultClasses, className)}>{children}</h1>
}

export default HeadLine