import type { AppDispatch } from "@/redux/store";
import { logoutUser, setUser } from "@/redux/userSlice";
import authApi from "@/utils/axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

function useAuth() {
  const dispatch = useDispatch<AppDispatch>();

  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const login = async () => {
    if (isLoggingIn) return;

    setIsLoggingIn(true);

    try {
      // Load Firebase only when Google sign-in is requested.
      const [{ auth, provider }, { signInWithPopup }] = await Promise.all([
        import("@/utils/firebase"),
        import("firebase/auth"),
      ]);

      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();

      const response = await authApi.post("/api/auth/login", { token });

      dispatch(setUser(response.data.user));
      toast.success("Login successful");

      return true;
    } catch (error) {
      console.error("Google authentication failed:", error);
      toast.error("Login failed. Please try again.");

      return false;
    } finally {
      setIsLoggingIn(false);
    }
  };

  const logout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      const response = await authApi.post("/api/auth/logout");

      if (!response.data.success) {
        toast.error("Logout failed. Please try again.");
        return false;
      }

      dispatch(logoutUser());
      toast.success("Logout successful");

      return true;
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");

      return false;
    } finally {
      setIsLoggingOut(false);
    }
  };

  return {
    login,
    logout,
    isLoggingIn,
    isLoggingOut,
  };
}

export default useAuth;
