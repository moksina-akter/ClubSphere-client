import { Link, useNavigate, useLocation, Navigate } from "react-router";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { TbFidgetSpinner } from "react-icons/tb";
import { toast } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { imageUpload } from "../utilis";

const SignUp = () => {
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";
  const {
    createUser,
    user,
    signInWithGoogle,
    updateUserProfile,
    setLoading,
    setUser,
    loading,
  } = useAuth();

  if (user) return <Navigate to="/" replace />;

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const { name, email, password, image } = data;

      let imageURL = "https://i.ibb.co/4pD1g8k/default-user.png";
      if (image && image[0]) {
        imageURL = await imageUpload(image[0]);
      }

      const result = await createUser(email, password);

      await updateUserProfile(name, imageURL);

      const saveUser = {
        name: name,
        email: email,
        photoURL: imageURL,
        uid: result.user?.uid,
        role: "member",
        createdAt: new Date(),
      };

      await axiosSecure.post(
        `${import.meta.env.VITE_LOCALHOST}/users`,
        saveUser
      );

      setUser({
        ...result.user,
        displayName: name,
        photoURL: imageURL,
        role: "member",
      });
      toast.success("Signup Successful!");
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const result = await signInWithGoogle();

      const saveUser = {
        name: result.user?.displayName,
        email: result.user?.email,
        photoURL: result.user?.photoURL,
        uid: result.user?.uid,
        role: "member",
        createdAt: new Date(),
      };

      await axiosSecure.post(
        `${import.meta.env.VITE_LOCALHOST}/users`,
        saveUser
      );

      toast.success("Login Successful!");
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !user) return <LoadingSpinner />;

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="flex flex-col max-w-md w-full p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900 shadow-lg">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-blue-600">Sign Up</h1>
          <p className="text-sm text-gray-500">
            Create your ClubSphere account
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Full Name</label>
            <input
              {...register("name", { required: "Name is required" })}
              type="text"
              className="w-full px-3 py-2 border rounded-md bg-white focus:outline-blue-500"
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              Profile Image
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("image", { required: "Image is required" })}
              className="w-full border rounded text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full  file:text-sm file:font-semibold "
            />
            {errors.image && (
              <p className="text-red-500 text-xs mt-1">
                {errors.image.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              Email Address
            </label>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              className="w-full px-3 py-2 border rounded-md bg-white focus:outline-blue-500"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Password</label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
                pattern: {
                  value: /(?=.*[a-z])(?=.*[A-Z])/,
                  message: "Must include uppercase and lowercase",
                },
              })}
              type="password"
              className="w-full px-3 py-2 border rounded-md bg-white focus:outline-blue-500"
              placeholder="Min 6 chars, A-z"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 w-full py-3 text-white rounded-md font-bold transition duration-200 flex justify-center items-center"
          >
            {loading ? (
              <TbFidgetSpinner className="animate-spin text-xl" />
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <div className="divider text-xs text-gray-400 my-4 text-center">OR</div>

        <button
          onClick={handleGoogleSignIn}
          className="flex justify-center items-center w-full space-x-2 border bg-white p-2 rounded-md hover:bg-gray-50 transition duration-200"
        >
          <FcGoogle size={24} />
          <span className="font-medium text-gray-700">
            Continue with Google
          </span>
        </button>

        <p className="text-center text-sm mt-6 text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-bold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
