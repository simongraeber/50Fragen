import React from "react"
import Page from "@/components/shared/Layout/Page.tsx"
import { TbLogin2 } from "react-icons/tb"
import { Button } from "@/components/ui/button.tsx"
import { Link } from "react-router-dom"


interface ErrorPageProps {
  error: string
}

const ErrorPage: React.FC<ErrorPageProps> = ({ error }) => {

  return (
    <Page>
      <TbLogin2 className="text-[10rem] mt-16" />
      <p className="font-light text-4xl pt-8 text-destructive">
        Unauthorized
      </p>
      <span className="text-destructive">
        {error}
      </span>

      <Link to="/">
        <Button className="mt-8">Go back to Home Page</Button>
      </Link>
      <Button
        className="mt-8"
        onClick={() => window.location.reload()}>
        Reload Page
      </Button>
    </Page>
  )
}

export default ErrorPage