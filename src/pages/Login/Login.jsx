// import { Link, Navigate, useLocation, useNavigate } from "react-router";
// import toast from "react-hot-toast";
// import LoadingSpinner from "../../components/Shared/LoadingSpinner";
// import useAuth from "../../hooks/useAuth";
// import { FcGoogle } from "react-icons/fc";
// import { TbFidgetSpinner } from "react-icons/tb";
// import { useForm } from "react-hook-form";

// const Login = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const { signIn, signInWithGoogle, loading, user, setLoading } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const from = location.state || "/";

//   if (loading) return <LoadingSpinner />;
//   if (user) return <Navigate to={from} replace={true} />;

//   // form submit handler
//   const onSubmit = async (event) => {
//     event.preventDefault();
//     const form = event.target;
//     const email = form.email.value;
//     const password = form.password.value;

//     try {
//       //User Login
//       await signIn(email, password);

//       navigate(from, { replace: true });
//       toast.success("Login Successful");
//     } catch (err) {
//       console.log(err);
//       toast.error(err?.message);
//     }
//   };

//   // Handle Google Signin
//   const handleGoogleSignIn = async () => {
//     try {
//       //User Registration using google
//       await signInWithGoogle();
//       navigate(from, { replace: true });
//       toast.success("Login Successful");
//     } catch (err) {
//       console.log(err);
//       setLoading(false);
//       toast.error(err?.message);
//     }
//   };
//   return (
//     <div className="flex justify-center items-center min-h-screen bg-white">
//       <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
//         <div className="mb-8 text-center">
//           <h1 className="my-3 text-4xl font-bold">Log In</h1>
//           <p className="text-sm text-gray-400">
//             Sign in to access your account
//           </p>
//         </div>
//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           // noValidate=""
//           // action=""
//           className="space-y-6 ng-untouched ng-pristine ng-valid"
//         >
//           <div className="space-y-4">
//             <div>
//               <label htmlFor="email" className="block mb-2 text-sm">
//                 Email address
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 placeholder="Enter Your Email Here"
//                 className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
//                 {...register("email", {
//                   required: "Email is required",
//                   pattern: {
//                     value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
//                     message: "Please enter a valid email address.",
//                   },
//                 })}
//               />{" "}
//               {errors.email && (
//                 <p className="text-red-500 text-xs mt-1">
//                   {errors.email.message}
//                 </p>
//               )}
//             </div>
//             <div>
//               <div className="flex justify-between">
//                 <label htmlFor="password" className="text-sm mb-2">
//                   Password
//                 </label>
//               </div>
//               <input
//                 type="password"
//                 id="password"
//                 placeholder="*******"
//                 className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
//                 {...register("password", {
//                   required: "Password is required",
//                   minLength: {
//                     value: 6,
//                     message: "Password must be at least 6 characters",
//                   },
//                 })}
//               />
//               {errors.password && (
//                 <p className="text-red-500 text-xs mt-1">
//                   {errors.password.message}
//                 </p>
//               )}
//             </div>
//           </div>

//           <div>
//             <button
//               type="submit"
//               className="bg-lime-500 w-full rounded-md py-3 text-white"
//             >
//               {loading ? (
//                 <TbFidgetSpinner className="animate-spin m-auto" />
//               ) : (
//                 "Login"
//               )}
//             </button>
//           </div>
//         </form>
//         <div className="space-y-1">
//           <button className="text-xs hover:underline hover:text-lime-500 text-gray-400 cursor-pointer">
//             Forgot password?
//           </button>
//         </div>
//         <div className="flex items-center pt-4 space-x-1">
//           <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
//           <p className="px-3 text-sm dark:text-gray-400">
//             Login with social accounts
//           </p>
//           <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
//         </div>
//         <div
//           onClick={handleGoogleSignIn}
//           className="flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer"
//         >
//           <FcGoogle size={32} />

//           <p>Continue with Google</p>
//         </div>
//         <p className="px-6 text-sm text-center text-gray-400">
//           Don&apos;t have an account yet?
//           <Link
//             state={from}
//             to="/signup"
//             className="hover:underline hover:text-lime-500 text-gray-600"
//           >
//             Sign up
//           </Link>
//           .
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;

import { Link, Navigate, useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import useAuth from "../../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { TbFidgetSpinner } from "react-icons/tb";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signIn, signInWithGoogle, loading, user, setLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";

  if (loading) return <LoadingSpinner />;
  if (user) return <Navigate to={from} replace={true} />;

  // LOGIN SUBMIT
  const onSubmit = async (data) => {
    try {
      await signIn(data.email, data.password);

      toast.success("Login Successful");
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      setLoading(false);
    }
  };

  // GOOGLE LOGIN
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();

      // SAVE USER TO DB IF NEW
      const saveUser = {
        name: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
        role: "member",
      };

      await fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(saveUser),
      });

      toast.success("Login Successful");
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-white">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Log In</h1>
          <p className="text-sm text-gray-400">
            Sign in to access your dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* EMAIL */}
          <div>
            <label className="block mb-2 text-sm">Email</label>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              className="w-full px-3 py-2 border rounded-md bg-gray-200"
              placeholder="Enter email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block mb-2 text-sm">Password</label>
            <input
              {...register("password", { required: "Password is required" })}
              type="password"
              className="w-full px-3 py-2 border rounded-md bg-gray-200"
              placeholder="*******"
            />
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
          </div>

          {/* BTN */}
          <button className="bg-blue-600 hover:bg-blue-700 w-full rounded-md py-3 text-white">
            {loading ? (
              <TbFidgetSpinner className="animate-spin m-auto" />
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* GOOGLE */}
        <div
          onClick={handleGoogleSignIn}
          className="flex justify-center items-center mt-4 space-x-2 border p-2 rounded-md cursor-pointer"
        >
          <FcGoogle size={28} />
          <p>Continue with Google</p>
        </div>

        <p className="text-center text-sm text-gray-400 mt-2">
          Don’t have an account?
          <Link to="/register" className="text-blue-600 ">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
