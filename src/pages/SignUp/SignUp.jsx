// import { Link, useLocation, useNavigate } from "react-router";
// import { FcGoogle } from "react-icons/fc";
// import useAuth from "../../hooks/useAuth";
// import { toast } from "react-hot-toast";
// import { TbFidgetSpinner } from "react-icons/tb";
// import { useForm } from "react-hook-form";

// const  = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const { createUser, updateUserProfile, signInWithGoogle, loading } =
//     useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const from = location.state || "/";

//   // form submit handler
//   const onSubmit = async (event) => {
//     event.preventDefault();
//     const form = event.target;
//     const name = form.name.value;
//     const email = form.email.value;
//     const password = form.password.value;

//     try {
//       //2. User Registration
//       const result = await createUser(email, password);

//       //3. Save username & profile photo
//       await updateUserProfile(
//         name,
//         "https://lh3.googleusercontent.com/a/ACg8ocKUMU3XIX-JSUB80Gj_bYIWfYudpibgdwZE1xqmAGxHASgdvCZZ=s96-c"
//       );
//       console.log(result);

//       navigate(from, { replace: true });
//       toast.success("Signup Successful");
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
//       toast.success("Signup Successful");
//     } catch (err) {
//       console.log(err);
//       toast.error(err?.message);
//     }
//   };
//   return (
//     <div className="flex justify-center items-center min-h-screen bg-white">
//       <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
//         <div className="mb-8 text-center">
//           <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
//           <p className="text-sm text-gray-400">Welcome to PlantNet</p>
//         </div>
//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           noValidate=""
//           action=""
//           className="space-y-6 ng-untouched ng-pristine ng-valid"
//         >
//           <div className="space-y-4">
//             {/* Name */}
//             <div>
//               <label htmlFor="email" className="block mb-2 text-sm">
//                 Name
//               </label>
//               <input
//                 type="text"
//                 id="name"
//                 placeholder="Enter Your Name Here"
//                 className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
//                 data-temp-mail-org="0"
//                 {...register("name", { required: "Name is required" })}
//               />{" "}
//               {errors.name && (
//                 <p className="text-red-500 text-xs mt-1">
//                   {errors.name.message}
//                 </p>
//               )}
//             </div>{" "}
//             {/* Role */}
//             <div>
//               <label className="block mb-2 text-sm font-medium">Role</label>
//               <select
//                 className="w-full px-4 py-3 rounded-md border border-gray-300"
//                 {...register("role", { required: "Role is required" })}
//               >
//                 <option value="borrower">Borrower</option>
//                 <option value="manager">Manager</option>
//               </select>
//               {errors.role && (
//                 <p className="text-red-500 text-xs mt-1">
//                   {errors.role.message}
//                 </p>
//               )}
//             </div>
//             {/* Image */}
//             <div>
//               <label
//                 htmlFor="image"
//                 className="block mb-2 text-sm font-medium text-gray-700"
//               >
//                 Profile Image
//               </label>
//               <input
//                 type="file"
//                 id="image"
//                 accept="image/*"
//                 {...register("image")}
//                 className="block w-full text-sm text-gray-500
//       file:mr-4 file:py-2 file:px-4
//       file:rounded-md file:border-0
//       file:text-sm file:font-semibold
//       file:bg-lime-50 file:text-lime-700
//       hover:file:bg-lime-100
//       bg-gray-100 border border-dashed border-lime-300 rounded-md cursor-pointer
//       focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-lime-400
//       py-2"
//               />
//               <p className="mt-1 text-xs text-gray-400">
//                 PNG, JPG or JPEG (max 2MB)
//               </p>
//             </div>
//             {/* Email */}
//             <div>
//               <label htmlFor="email" className="block mb-2 text-sm">
//                 Email address
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 {...register("email", { required: "Email is required" })}
//                 placeholder="Enter Your Email Here"
//                 className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
//                 data-temp-mail-org="0"
//               />
//               {errors.email && (
//                 <p className="text-red-500 text-xs mt-1">
//                   {errors.email.message}
//                 </p>
//               )}
//             </div>
//             {/* password */}
//             <div>
//               <div className="flex justify-between">
//                 <label htmlFor="password" className="text-sm mb-2">
//                   Password
//                 </label>
//               </div>
//               <input
//                 type="password"
//                 {...register("password", { required: "Password is required" })}
//                 // autoComplete="new-password"
//                 id="password"
//                 placeholder="*******"
//                 className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
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
//                 "Continue"
//               )}
//             </button>
//           </div>
//         </form>
//         <div className="flex items-center pt-4 space-x-1">
//           <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
//           <p className="px-3 text-sm dark:text-gray-400">
//             Signup with social accounts
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
//           Already have an account?{" "}
//           <Link
//             to="/login"
//             className="hover:underline hover:text-lime-500 text-gray-600"
//           >
//             Login
//           </Link>
//           .
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SignUp;

import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import { useForm } from "react-hook-form";
import axios from "axios";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser, updateUserProfile, signInWithGoogle, loading } =
    useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";

  // HANDLE SUBMIT
  const onSubmit = async (data) => {
    try {
      const { name, email, password, role, image } = data;

      // 1. Create User
      const result = await createUser(email, password);

      // 2. Profile Image Handling
      let photoURL = "https://i.ibb.co.com/4pD1g8k/default-user.png"; // fallback

      if (image && image.length > 0) {
        const formData = new FormData();
        formData.append("image", image[0]);
        console.log(formData);

        // USE ImgBB / Cloudinary if required (recommended)
        // const res = await axios.post(
        //   `https://api.imgbb.com/1/upload?key=${
        //     import.meta.env.VITE_IMGBB_KEY
        //   }`,
        //   formData
        // );
        // const imgData = await res.json();
        // photoURL = imgData.data.url;

        const res = await axios.post(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_IMGBB_KEY
          }`,
          formData
        );
        photoURL = res.data.data.url;
      }

      // 3. Update Firebase Profile
      await updateUserProfile(name, photoURL);

      // 4. Save user data to DB
      const saveUser = {
        name,
        email,
        role: role || "member",
        photoURL,
        createdAt: new Date(),
      };

      await axios.post(`${import.meta.env.VITE_LOCALHOST}/users`, saveUser, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success("Signup Successful");
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  // GOOGLE SIGNUP
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();

      // SAVE USER TO DB
      const saveUser = {
        name: result.user.displayName,
        email: result.user.email,
        role: "member",
        photoURL: result.user.photoURL,
        createdAt: new Date(),
      };

      await axios.post(`${import.meta.env.VITE_LOCALHOST}/users`, saveUser, {
        headers: { "Content-Type": "application/json" },
      });

      toast.success(" Successful");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="flex flex-col max-2xl-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
        <div className=" text-center">
          <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
          <p className="text-sm text-gray-400">Welcome to ClubSphere</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {/* NAME */}
            <div>
              <label className="block mb-2 text-sm">Name</label>
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                className="w-full px-3 py-2 border rounded-md bg-gray-200"
                placeholder="Enter your name"
              />
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name.message}</p>
              )}
            </div>

            {/* ROLE */}
            <div>
              <label className="block mb-2 text-sm">Role</label>
              <select
                {...register("role", { required: "Role is required" })}
                className="w-full px-3 py-2 border rounded-md bg-gray-200"
              >
                <option value="member">admin</option>
                <option value="manager">clubManager</option>
                <option value="manager">member</option>
              </select>
              {errors.role && (
                <p className="text-red-500 text-xs">{errors.role.message}</p>
              )}
            </div>

            {/* IMAGE */}
            <div>
              <label className="block mb-2 text-sm">Profile Image</label>
              <input
                type="file"
                accept="image/*"
                {...register("image")}
                className="file-input bg-gray-100"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="block mb-2 text-sm">Email</label>
              <input
                {...register("email", { required: "Email is required" })}
                type="email"
                className="w-full px-3 py-2 border rounded-md bg-gray-200"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email.message}</p>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block mb-2 text-sm">Password</label>
              <input
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                    message:
                      "Password must contain 1 uppercase, 1 lowercase & 6 characters",
                  },
                })}
                type="password"
                className="w-full px-3 py-2 border rounded-md bg-gray-200"
                placeholder="*******"
              />
              {errors.password && (
                <p className="text-red-500 text-xs">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 w-full rounded-md py-3 text-white"
          >
            {loading ? (
              <TbFidgetSpinner className="animate-spin m-auto" />
            ) : (
              "Continue"
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

        <p className="px-6 text-sm text-center mt-3 text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 ">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
