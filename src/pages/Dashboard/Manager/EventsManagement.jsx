import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";

const EventsManagement = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    eventDate: "",
    location: "",
    isPaid: false,
    eventFee: 0,
  });

  // Fetch events for manager's clubs
  const { data: events, isLoading } = useQuery({
    queryKey: ["managerEvents", user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_LOCALHOST}/manager/my-events`,
        { params: { email: user.email } }
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Create event mutation
  const createEventMutation = useMutation({
    mutationFn: async (eventData) =>
      axios.post(`${import.meta.env.VITE_LOCALHOST}/manager/create-event`, {
        ...eventData,
        managerEmail: user.email,
      }),
    onSuccess: () => queryClient.invalidateQueries(["managerEvents"]),
  });

  if (isLoading) return <p>Loading...</p>;

  const handleCreateEvent = () => {
    createEventMutation.mutate(newEvent);
    setNewEvent({
      title: "",
      description: "",
      eventDate: "",
      location: "",
      isPaid: false,
      eventFee: 0,
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Events</h1>

      {/* Create Event Form */}
      <div className="mb-6 border p-4 rounded shadow">
        <h2 className="font-medium mb-2">Add New Event</h2>
        <input
          type="text"
          placeholder="Event Title"
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
          className="border p-2 mb-2 w-full"
        />
        <textarea
          placeholder="Description"
          value={newEvent.description}
          onChange={(e) =>
            setNewEvent({ ...newEvent, description: e.target.value })
          }
          className="border p-2 mb-2 w-full"
        />
        <input
          type="datetime-local"
          value={newEvent.eventDate}
          onChange={(e) =>
            setNewEvent({ ...newEvent, eventDate: e.target.value })
          }
          className="border p-2 mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Location"
          value={newEvent.location}
          onChange={(e) =>
            setNewEvent({ ...newEvent, location: e.target.value })
          }
          className="border p-2 mb-2 w-full"
        />
        <div className="mb-2">
          <label>
            <input
              type="checkbox"
              checked={newEvent.isPaid}
              onChange={(e) =>
                setNewEvent({ ...newEvent, isPaid: e.target.checked })
              }
            />{" "}
            Paid Event
          </label>
          {newEvent.isPaid && (
            <input
              type="number"
              placeholder="Event Fee"
              value={newEvent.eventFee}
              onChange={(e) =>
                setNewEvent({ ...newEvent, eventFee: Number(e.target.value) })
              }
              className="border p-2 ml-2"
            />
          )}
        </div>
        <button
          onClick={handleCreateEvent}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Create Event
        </button>
      </div>

      {/* Events List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {events.map((event) => (
          <div key={event._id} className="border p-4 rounded shadow">
            <h3 className="font-bold">{event.title}</h3>
            <p>{event.description}</p>
            <p>Date: {new Date(event.eventDate).toLocaleString()}</p>
            <p>Location: {event.location}</p>
            <p>Fee: {event.isPaid ? `$${event.eventFee}` : "Free"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsManagement;
