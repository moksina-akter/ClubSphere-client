// import { Link, useLocation, useNavigate, Navigate } from "react-router";
// import { FcGoogle } from "react-icons/fc";
// import useAuth from "../../hooks/useAuth";
// import { toast } from "react-hot-toast";
// import { TbFidgetSpinner } from "react-icons/tb";
// import { useForm } from "react-hook-form";
// import axios from "axios";
// import LoadingSpinner from "../../components/Shared/LoadingSpinner";
// import { imageUpload } from "../utilis";

// const SignUp = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const navigate = useNavigate();
//   const location = useLocation();
//   const from = location.state || "/";
//   const auth = useAuth();

//   if (!auth || auth.loading) return <LoadingSpinner />;

//   const { createUser, user, signInWithGoogle, setLoading, setUser, loading } =
//     auth;

//   if (user) return <Navigate to="/" replace />;

//   const onSubmit = async (data) => {
//     try {
//       const { name, email, password, role, image } = data;
//       const imageURL = image
//         ? await imageUpload(image[0])
//         : "https://i.ibb.co/4pD1g8k/default-user.png";

//       // Firebase create user
//       const result = await createUser(email, password);

//       // Firebase token
//       const token = await result.user.getIdToken(true);

//       // Save user in backend
//       await axios.post(
//         `${import.meta.env.VITE_LOCALHOST}/users`,
//         {
//           name,
//           email,
//           role: role || "member",
//           image: imageURL,
//           uid: result.user.uid,
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setUser({ ...result.user, role: role || "member" });

//       toast.success("Signup Successful");
//       navigate(from, { replace: true });
//     } catch (err) {
//       console.log(err);
//       if (err.code === "auth/email-already-in-use") {
//         toast.error("Email already exists. Please login.");
//       } else if (err.response?.status === 403) {
//         toast.error("Forbidden: Cannot create user. Check backend auth.");
//       } else {
//         toast.error(err.message || "Something went wrong");
//       }
//     }
//   };

//   const handleGoogleSignIn = async () => {
//     setLoading(true);
//     try {
//       const result = await signInWithGoogle();
//       const currentUser = result.user;
//       const token = await currentUser.getIdToken(true);
//       const saveUser = {
//         name: currentUser.displayName || "",
//         email: currentUser.email,
//         photoURL: currentUser.photoURL || "",
//         uid: currentUser.uid,
//         role: "member",
//         createdAt: new Date(),
//       };
//       // POST to MongoDB only if first time login

//       await axios.post(`${import.meta.env.VITE_LOCALHOST}/users`, saveUser, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setUser({ ...currentUser, role: "member" });

//       toast.success("Login Successful");
//       navigate(from, { replace: true });
//     } catch (err) {
//       console.log(err);
//       toast.error(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-white">
//       <div className="flex flex-col max-2xl-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
//         <div className="text-center">
//           <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
//           <p className="text-sm text-gray-400">Welcome to ClubSphere</p>
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           <div className="space-y-4">
//             {/* NAME */}
//             <div>
//               <label className="block mb-2 text-sm">Name</label>
//               <input
//                 {...register("name", { required: "Name is required" })}
//                 type="text"
//                 className="w-full px-3 py-2 border rounded-md bg-gray-200"
//                 placeholder="Enter your name"
//               />
//               {errors.name && (
//                 <p className="text-red-500 text-xs">{errors.name.message}</p>
//               )}
//             </div>

//             {/* IMAGE */}
//             <div>
//               <label className="block mb-2 text-sm">Profile Image</label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 {...register("image")}
//                 className="file-input bg-gray-100"
//               />
//             </div>

//             {/* EMAIL */}
//             <div>
//               <label className="block mb-2 text-sm">Email</label>
//               <input
//                 {...register("email", { required: "Email is required" })}
//                 type="email"
//                 className="w-full px-3 py-2 border rounded-md bg-gray-200"
//                 placeholder="Enter your email"
//               />
//               {errors.email && (
//                 <p className="text-red-500 text-xs">{errors.email.message}</p>
//               )}
//             </div>

//             {/* PASSWORD */}
//             <div>
//               <label className="block mb-2 text-sm">Password</label>
//               <input
//                 {...register("password", {
//                   required: "Password is required",
//                   pattern: {
//                     value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
//                     message:
//                       "Password must contain 1 uppercase, 1 lowercase & at least 6 chars",
//                   },
//                 })}
//                 type="password"
//                 className="w-full px-3 py-2 border rounded-md bg-gray-200"
//                 placeholder="*******"
//               />
//               {errors.password && (
//                 <p className="text-red-500 text-xs">
//                   {errors.password.message}
//                 </p>
//               )}
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="bg-blue-600 hover:bg-blue-700 w-full rounded-md py-3 text-white"
//           >
//             {loading ? (
//               <TbFidgetSpinner className="animate-spin m-auto" />
//             ) : (
//               "Continue"
//             )}
//           </button>
//         </form>

//         {/* GOOGLE */}
//         <div
//           onClick={handleGoogleSignIn}
//           className="flex justify-center items-center mt-4 space-x-2 border p-2 rounded-md cursor-pointer"
//         >
//           <FcGoogle size={28} />
//           <p>Continue with Google</p>
//         </div>

//         <p className="px-6 text-sm text-center mt-3 text-gray-400">
//           Already have an account?{" "}
//           <Link to="/login" className="text-blue-600">
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SignUp;
import { Link, useNavigate, useLocation, Navigate } from "react-router";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { TbFidgetSpinner } from "react-icons/tb";
import { toast } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { imageUpload } from "../utilis";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";
  const auth = useAuth();
  if (!auth || auth.loading) return <LoadingSpinner />;

  const { createUser, user, signInWithGoogle, setLoading, setUser, loading } =
    auth;
  if (user) return <Navigate to="/" replace />;

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const { name, email, password, image } = data;
      const imageURL = image
        ? await imageUpload(image[0])
        : "https://i.ibb.co/4pD1g8k/default-user.png";

      // Firebase create user
      const result = await createUser(email, password);
      const currentUser = result.user;

      // Firebase token
      const token = await currentUser.getIdToken(true);

      // Save user securely in backend
      await axios.post(
        `${import.meta.env.VITE_LOCALHOST}/users`,
        {
          name,
          email,
          photoURL: imageURL,
          uid: currentUser.uid,
          role: "member",
          createdAt: new Date(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setUser({ ...currentUser, role: "member" });
      toast.success("Signup Successful");
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const result = await signInWithGoogle();
      const currentUser = result.user;

      const token = await currentUser.getIdToken(true);

      const saveUser = {
        name: currentUser.displayName || "",
        email: currentUser.email,
        photoURL: currentUser.photoURL || "",
        uid: currentUser.uid,
        role: "member",
        createdAt: new Date(),
      };

      await axios.post(`${import.meta.env.VITE_LOCALHOST}/users`, saveUser, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setUser({ ...currentUser, role: "member" });
      toast.success("Login Successful");
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold">Sign Up</h1>
          <p className="text-sm text-gray-400">Welcome to ClubSphere</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm">Name</label>
            <input
              {...register("name", { required: true })}
              type="text"
              className="w-full px-3 py-2 border rounded-md bg-gray-200"
            />
            {errors.name && (
              <p className="text-red-500 text-xs">Name is required</p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              {...register("image")}
              className="file-input bg-gray-100"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm">Email</label>
            <input
              {...register("email", { required: true })}
              type="email"
              className="w-full px-3 py-2 border rounded-md bg-gray-200"
            />
            {errors.email && (
              <p className="text-red-500 text-xs">Email is required</p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm">Password</label>
            <input
              {...register("password", { required: true, minLength: 6 })}
              type="password"
              className="w-full px-3 py-2 border rounded-md bg-gray-200"
            />
            {errors.password && (
              <p className="text-red-500 text-xs">
                Password must be at least 6 chars
              </p>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-600 w-full py-3 text-white rounded-md"
          >
            {loading ? (
              <TbFidgetSpinner className="animate-spin m-auto" />
            ) : (
              "Continue"
            )}
          </button>
        </form>

        <div
          onClick={handleGoogleSignIn}
          className="flex justify-center items-center mt-4 space-x-2 border p-2 rounded-md cursor-pointer"
        >
          <FcGoogle size={28} />
          <p>Continue with Google</p>
        </div>

        <p className="text-center text-sm mt-3 text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
