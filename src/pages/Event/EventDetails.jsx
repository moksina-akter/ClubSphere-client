import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Container from "../../components/Shared/Container";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import toast from "react-hot-toast";
import {
  HiOutlineLocationMarker,
  HiOutlineCalendar,
  HiOutlineUserGroup,
  HiBadgeCheck,
} from "react-icons/hi";

const EventDetails = () => {
  const { id } = useParams();
  const { user: firebaseUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [clubName, setClubName] = useState("");
  const [searchParams] = useSearchParams();

  const {
    data: event,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["event", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/events/${id}`);
      return res.data;
    },
  });

  useEffect(() => {
    if (!event) return;
    let clubId = event.clubId;
    if (typeof clubId === "object" && clubId?._id) clubId = clubId._id;
    if (clubId && clubId.length === 24) {
      axiosSecure
        .get(`/club/${clubId}`)
        .then((res) => setClubName(res.data?.clubName || "Unknown Club"))
        .catch(() => setClubName("Unknown Club"));
    }
  }, [event, axiosSecure]);

  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    if (sessionId && firebaseUser) {
      axiosSecure
        .post(`/events/payment-success`, { sessionId })
        .then(() => {
          toast.success("Payment successful! Event joined");
          queryClient.invalidateQueries(["myEvents"]);
          queryClient.invalidateQueries(["event", id]);
        })
        .catch((err) =>
          toast.error(err.response?.data?.message || "Verification failed")
        );
    }
  }, [searchParams, firebaseUser, axiosSecure, queryClient, id]);

  const handleRegister = async () => {
    if (!firebaseUser) return toast.error("Please login first");
    if (!event) return;
    try {
      const feeAmount = Number(event?.eventFee ?? 0);
      const isPaidEvent = !!event?.isPaid && feeAmount > 0;
      if (!isPaidEvent) {
        const res = await axiosSecure.post(`/events/${id}/register`);
        if (res.status === 200) {
          toast.success("Successfully joined!");
          queryClient.invalidateQueries(["myEvents"]);
          queryClient.invalidateQueries(["event", id]);
        }
        return;
      }
      const res = await axiosSecure.post(`/events/create-checkout-session`, {
        eventId: event._id,
      });
      if (res.data?.url) window.location.href = res.data.url;
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError || !event)
    return (
      <p className="text-center py-20 text-red-500 font-bold">
        Event not found.
      </p>
    );

  const feeAmount = Number(event?.eventFee ?? 0);

  return (
    <Container>
      <div className="max-w-2xl mx-auto my-16 px-4">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-xl p-8">
          {/* Badge & Title */}
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
              {event.category || "General Event"}
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-6">
            {event.title}
          </h1>

          {/* Details Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="flex items-center gap-3 text-gray-600 bg-gray-50 p-3 rounded-xl border border-gray-100">
              <HiOutlineCalendar className="text-blue-500 text-xl" />
              <span className="text-sm font-semibold">
                {new Date(event.createdAt).toDateString()}
              </span>
            </div>
            <div className="flex items-center gap-3 text-gray-600 bg-gray-50 p-3 rounded-xl border border-gray-100">
              <HiOutlineUserGroup className="text-blue-500 text-xl" />
              <span className="text-sm font-semibold truncate">
                {event.title}
              </span>
            </div>
            <div className="flex items-center gap-3 text-gray-600 bg-gray-50 p-3 rounded-xl border border-gray-100">
              <HiOutlineLocationMarker className="text-blue-500 text-xl" />
              <span className="text-sm font-semibold">{event.location}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600 bg-gray-50 p-3 rounded-xl border border-gray-100">
              <HiBadgeCheck className="text-green-500 text-xl" />
              <span className="text-sm font-bold text-gray-900">
                Fee: {feeAmount > 0 ? `৳${feeAmount}` : "FREE"}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">
              About Event
            </h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {event.description}
            </p>
          </div>

          {/* Action Button */}
          <button
            onClick={handleRegister}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-md active:scale-95"
          >
            {feeAmount > 0 ? `Pay ৳${feeAmount} & Join` : "Join Event Now"}
          </button>
        </div>
      </div>
    </Container>
  );
};

export default EventDetails;
