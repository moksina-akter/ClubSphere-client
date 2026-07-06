import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure"; // axiosSecure হুক
import toast from "react-hot-toast";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const EventRegistrations = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // ১. ইভেন্ট রেজিস্ট্রেশন ডাটা ফেচ করা
  const {
    data: registrations = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["eventRegistrations", user?.email],
    queryFn: async () => {
      // axiosSecure ই টোকেন ইন্টারসেপ্ট করবে, তাই আলাদা করে idToken লাগবে না
      const res = await axiosSecure.get(`/manager/event-registrations`, {
        params: { email: user?.email },
      });
      return res.data;
    },
    // লোডিং শেষ এবং ইউজার ইমেইল পাওয়ার পর কুয়েরি চলবে
    enabled: !loading && !!user?.email,
  });

  // ২. স্ট্যাটাস আপডেট করার মিউটেশন
  const updateStatusMutation = useMutation({
    mutationFn: async ({ registrationId, status }) => {
      const res = await axiosSecure.put(
        `/manager/event-registrations/${registrationId}`,
        {
          status,
        },
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("Status updated successfully");
      // ডাটাবেস আপডেট হওয়ার পর ডাটা রি-ফেচ করা
      queryClient.invalidateQueries(["eventRegistrations", user?.email]);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to update status");
    },
  });

  // ৩. রেন্ডারিং কন্ডিশনস (অ্যাসাইনমেন্টের জন্য জরুরি)
  if (loading || isLoading) return <LoadingSpinner />;

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-xl font-semibold">
          Please log in to view registrations.
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-500 text-center p-10">
        Error fetching registrations: {error.message}
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Event Registrations
      </h1>

      {registrations.length === 0 ? (
        <div className="bg-blue-50 p-6 rounded-lg text-center">
          <p className="text-[#FF6A1C] font-medium text-lg">
            No registrations found for this manager.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="table-auto w-full border-collapse bg-white">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="p-4 border text-left font-semibold">
                  Event Title
                </th>
                <th className="p-4 border text-left font-semibold">
                  Member Email
                </th>
                <th className="p-4 border text-left font-semibold">Status</th>
                <th className="p-4 border text-left font-semibold">
                  Registered At
                </th>
                <th className="p-4 border text-center font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((reg) => (
                <tr
                  key={reg._id}
                  className="hover:bg-gray-50 transition-colors border-b"
                >
                  <td className="p-4 border">{reg.eventTitle}</td>
                  <td className="p-4 border text-sm text-gray-600">
                    {reg.userEmail}
                  </td>
                  <td className="p-4 border">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${
                        reg.status === "attended"
                          ? "bg-green-100 text-green-700"
                          : reg.status === "cancelled"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {reg.status}
                    </span>
                  </td>
                  <td className="p-4 border text-sm">
                    {new Date(reg.registeredAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 border text-center space-x-2">
                    {/* কন্ডিশনাল বাটন রেন্ডারিং */}
                    {reg.status === "pending" && (
                      <>
                        <button
                          onClick={() =>
                            updateStatusMutation.mutate({
                              registrationId: reg._id,
                              status: "attended",
                            })
                          }
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded transition text-sm"
                        >
                          Confirm Attendance
                        </button>
                        <button
                          onClick={() =>
                            updateStatusMutation.mutate({
                              registrationId: reg._id,
                              status: "cancelled",
                            })
                          }
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition text-sm"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    {reg.status !== "pending" && (
                      <span className="text-gray-400 italic text-sm">
                        Action disabled
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EventRegistrations;
