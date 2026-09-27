import type { AppDispatch } from "@/redux/store";
import { setLoading, setUser } from "@/redux/userSlice";
import type { IUser } from "@/types/user";
import authApi from "@/utils/axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const useGetCurrentUser = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await authApi.get("/api/me");

        if (response.data.success) {
          const currentUser: IUser = response.data.user;
          dispatch(setUser(currentUser));
        }
      } catch (error) {
        console.error("useGetCurrentUser error:", error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchUser();
  }, [dispatch]);
};
