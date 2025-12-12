// import { useEffect } from 'react'
// import { useNavigate } from 'react-router'
// import axios from 'axios'
// import useAuth from './useAuth'

// const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
//   withCredentials: true,
// })

// const useAxiosSecure = () => {
//   const { user, logOut, loading } = useAuth()
//   const navigate = useNavigate()

//   useEffect(() => {
//     if (!loading && user?.accessToken) {
//       // Add request interceptor
//       const requestInterceptor = axiosInstance.interceptors.request.use(
//         config => {
//           config.headers.Authorization = `Bearer ${user.accessToken}`
//           return config
//         }
//       )

//       // Add response interceptor
//       const responseInterceptor = axiosInstance.interceptors.response.use(
//         res => res,
//         err => {
//           if (err?.response?.status === 401 || err?.response?.status === 403) {
//             logOut()
//               .then(() => {
//                 console.log('Logged out successfully.')
//               })
//               .catch(console.error)
//             navigate('/login')
//           }
//           return Promise.reject(err)
//         }
//       )

//       // Cleanup to prevent multiple interceptors on re-renders
//       return () => {
//         axiosInstance.interceptors.request.eject(requestInterceptor)
//         axiosInstance.interceptors.response.eject(responseInterceptor)
//       }
//     }
//   }, [user, loading, logOut, navigate])

//   return axiosInstance
// }
// export default useAxiosSecure
import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { auth } from "../firebase/firebase.config";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});

const useAxiosSecure = () => {
  const { logOut } = useAuth();

  useEffect(() => {
    axiosSecure.interceptors.request.use(async (config) => {
      const currentUser = auth.currentUser;

      if (currentUser) {
        // GET REAL FIREBASE ID TOKEN
        const token = await currentUser.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
        // console.log("🔥 Sending Token →", token);
      }

      return config;
    });

    axiosSecure.interceptors.response.use(
      (res) => res,
      (err) => {
        if (err.response?.status === 401 || err.response?.status === 403) {
          logOut();
        }
        return Promise.reject(err);
      }
    );
  }, [logOut]);

  return axiosSecure;
};

export default useAxiosSecure;
