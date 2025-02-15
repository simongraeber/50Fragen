import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { TbCloudX } from "react-icons/tb"
import Page from "@/components/shared/Layout/Page.tsx"

function NotFound() {
  return (
    <Page>
      <div className="flex flex-col items-center justify-center pb-32">
        <TbCloudX className="text-[10rem]" />
        <p className="font-light text-4xl pt-8 text-destructive">
          Page not found
        </p>

        <p className="text-xl pt-2">Error 404</p>

        <Link to="/">
          <Button className="mt-8">Go back to Home Page</Button>
        </Link>
      </div>
    </Page>
  )
}

export default NotFound