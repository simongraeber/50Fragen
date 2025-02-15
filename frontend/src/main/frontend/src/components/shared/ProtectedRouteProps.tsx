import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { ReactNode } from "react"
import { TbLogin2 } from "react-icons/tb";
import DiscordLogInButton from "@/components/shared/DiscordLogInButton.tsx"


interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const user = useSelector((state: RootState) => state.authentication.user);
  const location = useLocation();

  if (!user) {
    sessionStorage.setItem("lastSavedPage", location.pathname);

    return (
      <div className="flex flex-col items-center h-full justify-center pb-32">
        <TbLogin2 className="text-[10rem]" />
        <p className="font-light text-4xl pt-8 text-destructive">
          Unauthorized
        </p>

        <p className="text-xl pt-2">Error 401</p>

        <DiscordLogInButton />
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;