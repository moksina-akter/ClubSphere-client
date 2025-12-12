import React from "react";
import { useParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import Container from "../../components/Shared/Container";
import toast from "react-hot-toast";

const fetchEventById = async (id) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_LOCALHOST}/events/${id}`
  );
  return data;
};

const EventDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  // const navigate = useNavigate();
  const {
    data: event,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["event", id],
    queryFn: () => fetchEventById(id),
  });

  const registerMutation = useMutation({
    mutationFn: (userEmail) =>
      axios.post(`${import.meta.env.VITE_LOCALHOST}/events/${id}/register`, {
        userEmail,
      }),
    onSuccess: () => {
      toast.success("Successfully registered!");
      // navigate("member/my-events");
      queryClient.invalidateQueries(["event", id]);
      queryClient.invalidateQueries(["myEvents", user.email]);
    },
    onError: () => toast.error("Error occurred during registration"),
  });

  const handleRegister = async () => {
    const feeAmount = Number(event?.fee?.$numberInt ?? event?.fee ?? 0);

    console.log("Fee Amount:", feeAmount);

    // Free Event
    if (feeAmount === 0) {
      const res = await axios.post(
        `${import.meta.env.VITE_LOCALHOST}/free-event/join`,
        {
          userEmail: user.email,
          eventId: event._id,
        }
      );

      if (res.data.insertedId) {
        toast.success("Successfully Joined Free Event!");
      }
      return;
    }

    // Paid Event → Stripe
    const res = await axios.post(
      `${import.meta.env.VITE_LOCALHOST}/create-payment-intent`,
      {
        fee: feeAmount,
        eventId: event._id,
        userEmail: user.email,
      }
    );

    window.location.href = res.data.url; // Stripe Checkout redirect
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading event.</p>;
  const feeAmount = Number(event?.fee?.$numberInt || event.fee || 0);

  return (
    <Container>
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold">{event.title}</h1>
        <p className="text-gray-500 mt-1">
          {new Date(event.createdAt).toLocaleString()}
        </p>
        <p className="mt-2">{event.description}</p>
        <p className="mt-2 font-medium">Location: {event.location}</p>
        <p className="mt-2 font-medium">Club: {event.clubId}</p>
        <p className="mt-2 font-medium">
          {feeAmount > 0 ? `Fee: ৳${feeAmount}` : "Free"}
        </p>

        <button
          onClick={handleRegister}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          {feeAmount > 0 ? "Pay & Register" : "Join Event"}
        </button>
      </div>
    </Container>
  );
};

export default EventDetails;
