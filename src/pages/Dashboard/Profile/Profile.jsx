import { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const Profile = () => {
  const { user, updateUserProfile } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      displayName: user?.displayName || "",
      photoURL: user?.photoURL || "",
      email: user?.email || "",
    },
  });

  useEffect(() => {
    reset({
      displayName: user?.displayName || "",
      photoURL: user?.photoURL || "",
      email: user?.email || "",
    });
  }, [user, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await updateUserProfile(data); // Firebase + backend update
      toast.success("Profile updated successfully!");
      setModalOpen(false);
      reset(data);
    } catch (error) {
      toast.error("Failed to update profile");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-2xl p-6 md:p-10 flex flex-col md:flex-row items-center gap-6">
        {/* Profile Image */}
        <div className="flex-shrink-0">
          <img
            src={user?.photoURL || "/default-avatar.png"}
            alt="Profile"
            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-md border-2 border-blue-200"
          />
        </div>

        {/* Profile Info */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">
            {user?.name || "User Name"}
          </h2>
          <p className="text-gray-600 mb-2">
            <span className="font-semibold">Email:</span> {user?.email}
          </p>
          <p className="text-gray-600 mb-2 capitalize">
            <span className="font-semibold">Role:</span>{" "}
            {user?.role || "Member"}
          </p>

          {/* Edit Profile Button */}
          <button
            onClick={() => setModalOpen(true)}
            className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow transition"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">
              Update Profile
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Name
                </label>
                <input
                  {...register("displayName")}
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Photo URL
                </label>
                <input
                  {...register("photoURL")}
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Email (readonly)
                </label>
                <input
                  {...register("email")}
                  type="email"
                  readOnly
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-100 cursor-not-allowed"
                />
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow transition"
                >
                  {loading ? "Updating..." : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
