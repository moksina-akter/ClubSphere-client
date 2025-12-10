// import { Link, Navigate, useLocation, useNavigate } from "react-router";
// import toast from "react-hot-toast";
// import LoadingSpinner from "../../components/Shared/LoadingSpinner";
// import useAuth from "../../hooks/useAuth";
// import { FcGoogle } from "react-icons/fc";
// import { useForm } from "react-hook-form";
// import { TbFidgetSpinner } from "react-icons/tb";

// const Login = () => {
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
//   const { signIn, signInWithGoogle, loading, user, setLoading } = auth;

//   if (user) return <Navigate to={from} replace={true} />;

//   // LOGIN SUBMIT
//   const onSubmit = async (data) => {
//     try {
//       await signIn(data.email, data.password);

//       toast.success("Login Successful");
//       navigate(from, { replace: true });
//     } catch (err) {
//       console.log(err);
//       toast.error(err.message);
//       setLoading(false);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // GOOGLE LOGIN
//   const handleGoogleSignIn = async () => {
//     try {
//       const result = await signInWithGoogle();

//       // SAVE USER TO DB IF NEW
//       const saveUser = {
//         name: result.user.displayName,
//         email: result.user.email,
//         photoURL: result.user.photoURL,
//         role: "member",
//       };

//       await fetch(`${import.meta.env.VITE_API_URL}/users`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(saveUser),
//       });

//       toast.success("Login Successful");
//       navigate(from, { replace: true });
//     } catch (err) {
//       console.log(err);
//       toast.error(err.message);
//       setLoading(false);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center w-full min-h-screen bg-white">
//       <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
//         <div className="mb-8 text-center">
//           <h1 className="my-3 text-4xl font-bold">Log In</h1>
//           <p className="text-sm text-gray-400">
//             Sign in to access your dashboard
//           </p>
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           {/* EMAIL */}
//           <div>
//             <label className="block mb-2 text-sm">Email</label>
//             <input
//               {...register("email", { required: "Email is required" })}
//               type="email"
//               className="w-full px-3 py-2 border rounded-md bg-gray-200"
//               placeholder="Enter email"
//             />
//             {errors.email && (
//               <p className="text-red-500 text-xs">{errors.email.message}</p>
//             )}
//           </div>

//           {/* PASSWORD */}
//           <div>
//             <label className="block mb-2 text-sm">Password</label>
//             <input
//               {...register("password", { required: "Password is required" })}
//               type="password"
//               className="w-full px-3 py-2 border rounded-md bg-gray-200"
//               placeholder="*******"
//             />
//             {errors.password && (
//               <p className="text-red-500 text-xs">{errors.password.message}</p>
//             )}
//           </div>

//           {/* BTN */}
//           <button className="bg-blue-600 hover:bg-blue-700 w-full rounded-md py-3 text-white">
//             {loading ? (
//               <TbFidgetSpinner className="animate-spin m-auto" />
//             ) : (
//               "Login"
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

//         <p className="text-center text-sm text-gray-400 mt-2">
//           Don’t have an account?
//           <Link to="/register" className="text-blue-600 ">
//             Register
//           </Link>
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

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";
  const auth = useAuth();

  if (!auth || auth.loading) return <LoadingSpinner />;

  const { signIn, signInWithGoogle, loading, user, setLoading } = auth;

  if (user) return <Navigate to={from} replace={true} />;

  const onSubmit = async (data) => {
    try {
      await signIn(data.email, data.password);

      toast.success("Login Successful");
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ============================
  //        GOOGLE LOGIN
  // ============================
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();

      // SAVE USER IF NEW
      const saveUser = {
        name: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
        role: "member",
        createdAt: new Date(),
      };

      await fetch(`${import.meta.env.VITE_LOCALHOST}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(saveUser),
      });

      toast.success("Login Successful");
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
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
