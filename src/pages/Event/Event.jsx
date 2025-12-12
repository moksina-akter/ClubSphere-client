import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router";
import { motion } from "framer-motion";
import Container from "../../components/Shared/Container";

const fetchEvents = async () => {
  const { data } = await axios.get(`${import.meta.env.VITE_LOCALHOST}/events`);
  return data;
};

export default function Event() {
  const {
    data: events,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });

  if (isLoading) return <p>Loading events...</p>;
  if (isError) return <p>Error loading events.</p>;

  return (
    <Container>
      {" "}
      <h1 className="text-3xl font-bold p-5 mt-5 text-blue-700 text-center">
        All Events
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {events.map((event) => (
          <motion.div
            key={event._id}
            className="bg-white p-4 rounded shadow hover:shadow-lg transition"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-xl font-bold">{event.title}</h2>
            <p className="text-sm text-gray-500">
              {new Date(event.createdAt).toLocaleString()}
            </p>
            <p className="mt-2">{event.description.substring(0, 100)}...</p>
            <p className="mt-1 font-medium">Club: {event.clubId}</p>
            <p className="mt-1 font-medium">
              {event.fee > 0 ? `Fee: ৳${event.fee}` : "Free"}
            </p>
            <Link
              to={`/events/${event._id}`}
              className="mt-3 inline-block bg-blue-500 text-white px-4 py-2 rounded"
            >
              View Details
            </Link>
          </motion.div>
        ))}
      </div>
    </Container>
  );
}
