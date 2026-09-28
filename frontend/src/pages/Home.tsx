import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import UserProfile from "@/components/UserProfile";
import type { AppDispatch, RootState } from "@/redux/store";
import { logoutUser, setUser } from "@/redux/userSlice";
import authApi from "@/utils/axios";
import { auth, provider } from "@/utils/firebase";
import { signInWithPopup } from "firebase/auth";
import { LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import logo from "../assets/logo.png";

function Home() {
  const [openMenu, setOpenMenu] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const user = useSelector((state: RootState) => state.user.user);

  const dispatch = useDispatch<AppDispatch>();

  const googleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      const token = await result.user.getIdToken();

      const response = await authApi.post("/api/auth/login", { token });

      dispatch(setUser(response.data.user));
      setModalOpen(false);
      toast.success("Login Successfully");
    } catch (error) {
      console.error("AUTH API RESPONSE Error: ", error);
      toast.error("Login Failed");
    }
  };

  const handleLogout = async () => {
    try {
      const response = await authApi.post("/api/auth/logout");

      if (response.data.success) {
        dispatch(logoutUser());
        toast.success("Logout Successfully");
      }
    } catch (error) {
      console.error("LOGOUT ERROR: ", error);
      toast.error("Logout Failed");
    }
  };

  return (
    <div className="min-h-screen w-full bg-white text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-2">
            <img
              src={logo}
              alt="logo"
              className="h-6 w-6 rounded-sm object-contain"
            />
            <span className="text-lg font-semibold tracking-tight">
              SelloraAI
            </span>
          </div>
          <div className="hidden items-center gap-3 md:flex">
            {user ? (
              <div className="flex items-center gap-3">
                <UserProfile name={user.name} />
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="gap-1.5"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                className="bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
                onClick={() => setModalOpen((prev) => !prev)}
              >
                SignIn
              </Button>
            )}
          </div>
          <button
            className="md:hidden"
            onClick={() => setOpenMenu((prev) => !prev)}
            aria-label={openMenu ? "Close menu" : "Open menu"}
            aria-expanded={openMenu}
          >
            {openMenu ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
        {openMenu && (
          <div className="flex flex-col gap-4 border-t border-slate-100 px-4 py-4 sm:px-6 md:hidden">
            {user ? (
              <>
                <UserProfile name={user.name} />
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="w-full gap-1.5"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </>
            ) : (
              <Button
                className="w-full bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
                onClick={() => setModalOpen((prev) => !prev)}
              >
                SignIn
              </Button>
            )}
          </div>
        )}
      </header>
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader className="items-center text-center">
            <img
              src={logo}
              alt="logo"
              className="w-10 h-10 rounded-md object-contain"
            />
            <DialogTitle className="mt-2 text-lg font-semibold">
              SelloraAI
            </DialogTitle>
          </DialogHeader>
          <Button
            onClick={googleAuth}
            variant="outline"
            className="mt-2 w-full gap-2"
          >
            <FcGoogle className="w-4 h-4" />
            Continue with Google
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
