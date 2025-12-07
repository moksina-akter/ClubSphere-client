// pages/EventsPage.jsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router";
import { motion } from "framer-motion";

const fetchEvents = async () => {
  const { data } = await axios.get("/api/events");
  return data;
};

export default function Event() {
  const {
    data: events,
    isLoading,
    isError,
  } = useQuery(["events"], fetchEvents);

  if (isLoading) return <p>Loading events...</p>;
  if (isError) return <p>Error loading events.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {events.map((event) => (
        <motion.div
          key={event._id}
          className="border p-4 rounded shadow hover:shadow-lg transition"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-xl font-bold">{event.title}</h2>
          <p className="text-sm text-gray-500">
            {new Date(event.eventDate).toLocaleDateString()}
          </p>
          <p className="mt-2">{event.description.substring(0, 100)}...</p>
          <p className="mt-1 font-medium">Club: {event.clubId.clubName}</p>
          <p className="mt-1 font-medium">
            {event.isPaid ? `Fee: $${event.eventFee}` : "Free"}
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
  );
}
