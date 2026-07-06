import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router";
import { motion } from "framer-motion";
import Container from "../../components/Shared/Container";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

export default function Event() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const {
    data: events = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["events", search, category],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_LOCALHOST}/events`,
        {
          params: { search, category },
        },
      );
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return (
      <p className="text-center text-red-500 mt-10">Error loading events.</p>
    );

  return (
    <Container>
      <h1 className="text-3xl font-bold p-5 mt-5 text-[#FF6A1C] text-center">
        All Events
      </h1>

      {/* --- Search & Filter Section --- */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 px-6 items-center justify-center">
        {/* Search Input */}
        <div className="w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search by event title..."
            className="input input-bordered w-full border-blue-300 focus:outline-blue-500"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Category Dropdown */}
        <div className="w-full md:w-1/4">
          <select
            className="select select-bordered w-full border-blue-300 focus:outline-blue-500"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Sports">Sports</option>
            <option value="Cultural">Cultural</option>
            <option value="Science">Science</option>
            <option value="Technology">Technology</option>
            <option value="Business">Business</option>
          </select>
        </div>
      </div>

      {/* --- Events Grid --- */}
      {events.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 text-lg">
            No events found matching your search.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
          {events.map((event) => (
            <motion.div
              key={event._id}
              className="bg-white p-5 rounded-xl shadow-md border border-gray-100 hover:shadow-2xl transition-all flex flex-col justify-between"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
            >
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {event.title}
                </h2>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-semibold bg-blue-100 text-[#FF6A1C] px-2 py-1 rounded-full uppercase">
                    {event.category || "General"}
                  </span>
                  <p className="text-xs text-gray-400">
                    {new Date(event.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {event.description}
                </p>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-700 italic">
                    Club: <span className="text-[#FF6A1C]">{event.clubId}</span>
                  </p>
                  <p className="text-lg font-bold text-green-600">
                    {event.eventFee > 0 ? `৳${event.eventFee}` : "Free"}
                  </p>
                </div>
              </div>

              <Link
                to={`/events/${event._id}`}
                className="mt-5 block text-center bg-[#FF6A1C] hover:bg-[rgb(220,84,11)] text-white font-semibold py-2 rounded-lg transition"
              >
                View Details
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </Container>
  );
}
