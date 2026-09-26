import authApi from "@/utils/axios";
import { useEffect } from "react";

export const useGetCurrentUser = () => {
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await authApi.get("/api/me");

        if (!response.data.success) {
          return;
        }

        console.log("useGetCurrentUser: ", response.data);
      } catch (error) {
        console.log("useGetCurrentUser error: ", error);
      }
    };

    fetchUser();
  }, []);
};
