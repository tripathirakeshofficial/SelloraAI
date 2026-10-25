import type { IUser } from "@/types/user";
import { LogOut } from "lucide-react";
import UserProfile from "./UserProfile";
import { Button } from "./ui/button";

type AuthActionsProps = {
  user: IUser | null;
  isLoggingIn: boolean;
  isLoggingOut: boolean;
  onLogin: () => void;
  onLogout: () => void;
  mobile?: boolean;
};

function AuthActions({
  user,
  isLoggingIn,
  isLoggingOut,
  onLogin,
  onLogout,
  mobile = false,
}: AuthActionsProps) {
  if (user) {
    return (
      <div
        className={`flex ${
          mobile ? "flex-col items-stretch" : "items-center"
        } gap-3`}
      >
        <UserProfile name={user.name} />
        <Button
          onClick={onLogout}
          variant="outline"
          disabled={isLoggingOut}
          className="gap-1.5"
        >
          <LogOut className="h-4 w-4" />
          {isLoggingOut ? "Logging out..." : "Logout"}
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={onLogin}
      disabled={isLoggingIn}
      className={`cursor-pointer bg-indigo-600 hover:bg-indigo-700 ${
        mobile ? "w-full" : ""
      }`}
    >
      {isLoggingIn ? "Signing in..." : "Sign In"}
    </Button>
  );
}

export default AuthActions;
