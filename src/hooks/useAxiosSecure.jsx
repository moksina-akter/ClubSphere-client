import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { auth } from "../firebase/firebase.config";

const axiosSecure = axios.create({ baseURL: import.meta.env.VITE_LOCALHOST });

let isInterceptorAdded = false;

const useAxiosSecure = () => {
  const { logOut } = useAuth();

  useEffect(() => {
    if (!isInterceptorAdded) {
      axiosSecure.interceptors.request.use(async (config) => {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const token = await currentUser.getIdToken(true);
          // console.log("🔥 Token →", token);

          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      });

      axiosSecure.interceptors.response.use(
        (res) => res,
        (err) => {
          if (err.response?.status === 401 || err.response?.status === 403) {
            logOut(); // token expired or role mismatch
          }
          return Promise.reject(err);
        }
      );

      isInterceptorAdded = true;
    }
  }, [logOut]);

  return axiosSecure;
};

export default useAxiosSecure;
