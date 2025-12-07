// pages/EventDetailsPage.jsx
import React from "react";
import { useParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Container from "../../components/Shared/Container";

const fetchEventById = async (id) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_LOCALHOST}/events/${id}`
  );
  return data;
};

export default function EventDetailsPage() {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const {
    data: event,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["event", id], // unique key, id সহ
    queryFn: () => fetchEventById(id), // function call
  });

  // const registerMutation = useMutation(
  //   (userEmail) => axios.post(`/api/events/${id}/register`, { userEmail }),
  //   {
  //     onSuccess: () => {
  //       alert("Registered successfully");
  //       queryClient.invalidateQueries(["event", id]);
  //     },
  //     onError: () => alert("Error registering"),
  //   }
  // );
  const registerMutation = useMutation({
    mutationFn: (userEmail) =>
      axios.post(`/api/events/${id}/register`, { userEmail }),
    onSuccess: () => {
      alert("Registered successfully");
      queryClient.invalidateQueries(["event", id]);
    },
    onError: () => alert("Error registering"),
  });

  const handleRegister = () => {
    const email = prompt("Enter your email to register"); // simple for now
    if (email) registerMutation.mutate(email);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading event.</p>;

  return (
    <Container>
      {" "}
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold">{event.title}</h1>
        <p className="text-gray-500 mt-1">
          {new Date(event.eventDate).toLocaleString()}
        </p>
        <p className="mt-2">{event.description}</p>
        <p className="mt-2 font-medium">Location: {event.location}</p>
        <p className="mt-2 font-medium">Club: {event.clubId.clubName}</p>
        <p className="mt-2 font-medium">
          {event.isPaid ? `Fee: $${event.eventFee}` : "Free"}
        </p>

        <button
          onClick={handleRegister}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          {event.isPaid ? "Pay & Register" : "Join Event"}
        </button>
      </div>
    </Container>
  );
}
