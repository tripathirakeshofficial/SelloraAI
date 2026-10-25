import type { AppDispatch } from "@/redux/store";
import { setLoading, setUser } from "@/redux/userSlice";
import type { IUser } from "@/types/user";
import authApi from "@/utils/axios";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const useGetCurrentUser = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Restore the authenticated user from the server-side session.
        const response = await authApi.get("/api/me");

        if (response.data.success && response.data.user) {
          const currentUser: IUser = response.data.user;

          // Store the authenticated user's details in Redux.
          dispatch(setUser(currentUser));
        } else {
          // Prevent a stale user from remaining in Redux if the
          // API responds successfully but provides no valid user.
          dispatch(setUser(null));
        }
      } catch (error) {
        // Clear the user only when the server rejects authentication
        // or denies access. Preserve the user during temporary failures.
        const status = axios.isAxiosError(error)
          ? error.response?.status
          : undefined;

        if (status === 401 || status === 403) {
          dispatch(setUser(null));
        }

        console.error("useGetCurrentUser error:", error);
      } finally {
        // Finish the initial loading state regardless of the outcome.
        dispatch(setLoading(false));
      }
    };

    fetchUser();
  }, [dispatch]);
};
