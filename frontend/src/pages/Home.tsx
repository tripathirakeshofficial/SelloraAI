import googleIcon from "@/assets/google.svg";
import AuthActions from "@/components/AuthActions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useAuth from "@/hooks/useAuth";
import type { RootState } from "@/redux/store";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import logo from "../assets/logo.png";

function Home() {
  const [openMenu, setOpenMenu] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const user = useSelector((state: RootState) => state.user.user);

  const { login, logout, isLoggingIn, isLoggingOut } = useAuth();

  const handleLogin = async () => {
    const success = await login();

    if (success) {
      setModalOpen(false);
      setOpenMenu(false);
    }
  };

  const handleLogout = async () => {
    const success = await logout();

    if (success) {
      setOpenMenu(false);
    }
  };

  const openLogin = () => {
    setOpenMenu(false);
    setModalOpen(true);
  };

  const handleLoginDialogChange = (open: boolean) => {
    if (isLoggingIn) return;
    setModalOpen(open);
  };

  return (
    <div className="min-h-screen w-full bg-white text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-2">
            <img
              src={logo}
              alt="SelloraAI logo"
              className="h-6 w-6 rounded-sm object-contain"
            />

            <span className="text-lg font-semibold tracking-tight">
              SelloraAI
            </span>
          </div>

          {/* Desktop authentication actions */}
          <div className="hidden items-center gap-3 md:flex">
            <AuthActions
              user={user}
              isLoggingIn={isLoggingIn}
              isLoggingOut={isLoggingOut}
              onLogin={openLogin}
              onLogout={handleLogout}
            />
          </div>

          {/* Mobile navigation toggle */}
          <button
            type="button"
            className="md:hidden"
            onClick={() => setOpenMenu((open) => !open)}
            aria-label={openMenu ? "Close menu" : "Open menu"}
            aria-expanded={openMenu}
            aria-controls="mobile-navigation"
          >
            {openMenu ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile authentication actions */}
        {openMenu && (
          <div
            id="mobile-navigation"
            className="border-t border-slate-100 px-4 py-4 sm:px-6 md:hidden"
          >
            <AuthActions
              user={user}
              isLoggingIn={isLoggingIn}
              isLoggingOut={isLoggingOut}
              onLogin={openLogin}
              onLogout={handleLogout}
              mobile
            />
          </div>
        )}
      </header>

      {/* Google sign-in dialog */}
      <Dialog open={modalOpen} onOpenChange={handleLoginDialogChange}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader className="items-center text-center">
            <img
              src={logo}
              alt="SelloraAI logo"
              className="h-10 w-10 rounded-md object-contain"
            />

            <DialogTitle className="mt-2 text-lg font-semibold">
              SelloraAI
            </DialogTitle>
          </DialogHeader>

          <Button
            onClick={handleLogin}
            disabled={isLoggingIn}
            variant="outline"
            className="mt-2 w-full gap-2"
          >
            <img
              src={googleIcon}
              alt=""
              aria-hidden="true"
              className="h-4 w-4 shrink-0"
            />
            {isLoggingIn ? "Signing in..." : "Continue with Google"}
          </Button>

          <p className="mt-4 text-center text-xs text-slate-400">
            Secure authentication by Firebase
          </p>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Home;
