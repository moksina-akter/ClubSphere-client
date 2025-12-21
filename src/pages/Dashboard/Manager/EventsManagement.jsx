// import { useState } from "react";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import useAuth from "../../../hooks/useAuth";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";

// const EventsManagement = () => {
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();
//   const queryClient = useQueryClient();

//   const [eventForm, setEventForm] = useState({
//     clubId: "",
//     title: "",
//     description: "",
//     eventDate: "",
//     location: "",
//     isPaid: false,
//     eventFee: 0,
//     maxAttendees: 0,
//   });

//   const [editingEvent, setEditingEvent] = useState(null);

//   // ========== Fetch manager's clubs ==========
//   const { data: myClubs = [] } = useQuery({
//     queryKey: ["managerClubs", user?.email],
//     enabled: !!user?.email,
//     queryFn: async () => {
//       const res = await axiosSecure.get("/manager/my-clubs");
//       return res.data;
//     },
//   });

//   // ========== Fetch manager's events ==========
//   const { data: events = [] } = useQuery({
//     queryKey: ["managerEvents", user?.email],
//     enabled: !!user?.email,
//     queryFn: async () => {
//       const res = await axiosSecure.get("/manager/my-events");
//       return res.data;
//     },
//   });

//   // ========== Create Event ==========
//   const createEventMutation = useMutation({
//     mutationFn: async (data) => {
//       const res = await axiosSecure.post("/manager/create-event", data);
//       return res.data;
//     },
//     onSuccess: () => {
//       alert("Event created successfully");
//       setEventForm({
//         clubId: "",
//         title: "",
//         description: "",
//         eventDate: "",
//         location: "",
//         isPaid: false,
//         eventFee: 0,
//         maxAttendees: 0,
//       });
//       queryClient.invalidateQueries(["managerEvents", user?.email]);
//     },
//   });

//   // ========== Update Event ==========
//   const updateEventMutation = useMutation({
//     mutationFn: async ({ id, updatedData }) => {
//       const res = await axiosSecure.put(
//         `/manager/my-events/${id}`,
//         updatedData
//       );
//       return res.data;
//     },
//     onSuccess: () => {
//       alert("Event updated successfully");
//       setEditingEvent(null);
//       queryClient.invalidateQueries(["managerEvents", user?.email]);
//     },
//   });

//   // ========== Delete Event ==========
//   const deleteEventMutation = useMutation({
//     mutationFn: async (id) => {
//       if (!window.confirm("Are you sure you want to delete this event?"))
//         return;
//       const res = await axiosSecure.delete(`/manager/my-events/${id}`);
//       return res.data;
//     },
//     onSuccess: () => {
//       alert("Event deleted successfully");
//       queryClient.invalidateQueries(["managerEvents", user?.email]);
//     },
//   });

//   const handleCreateOrUpdate = () => {
//     if (!eventForm.clubId) return alert("Select a club");
//     if (!eventForm.title) return alert("Enter event title");
//     if (!eventForm.eventDate) return alert("Enter event date");
//     if (eventForm.isPaid && (!eventForm.eventFee || eventForm.eventFee <= 0))
//       return alert("Enter a valid event fee");
//     if (!eventForm.maxAttendees || eventForm.maxAttendees <= 0)
//       return alert("Enter max attendees");

//     const payload = {
//       ...eventForm,
//       eventFee: eventForm.isPaid ? Number(eventForm.eventFee) : 0,
//       maxAttendees: Number(eventForm.maxAttendees),
//     };

//     if (editingEvent) {
//       updateEventMutation.mutate({
//         id: editingEvent._id,
//         updatedData: payload,
//       });
//     } else {
//       createEventMutation.mutate(payload);
//     }
//   };

//   const handleEditClick = (event) => {
//     setEditingEvent(event);
//     setEventForm({
//       clubId: event.clubId,
//       title: event.title,
//       description: event.description,
//       eventDate: new Date(event.eventDate).toISOString().slice(0, 16),
//       location: event.location,
//       isPaid: event.isPaid,
//       eventFee: event.eventFee || 0,
//       maxAttendees: event.maxAttendees || 0,
//     });
//   };

//   const handleCancelEdit = () => {
//     setEditingEvent(null);
//     setEventForm({
//       clubId: "",
//       title: "",
//       description: "",
//       eventDate: "",
//       location: "",
//       isPaid: false,
//       eventFee: 0,
//       maxAttendees: 0,
//     });
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Events Management</h1>

//       {/* Create / Edit Event Form */}
//       <div className="bg-white p-4 rounded shadow mb-6">
//         <h2 className="text-xl font-semibold mb-2">
//           {editingEvent ? "Edit Event" : "Create Event"}
//         </h2>

//         <select
//           className="border p-2 rounded w-full mb-2"
//           value={eventForm.clubId}
//           onChange={(e) =>
//             setEventForm({ ...eventForm, clubId: e.target.value })
//           }
//         >
//           <option value="">Select Approved Club</option>
//           {myClubs.map((club) => (
//             <option key={club._id} value={club._id}>
//               {club.clubName}
//             </option>
//           ))}
//         </select>

//         <input
//           type="text"
//           placeholder="Event Title"
//           className="border p-2 rounded w-full mb-2"
//           value={eventForm.title}
//           onChange={(e) =>
//             setEventForm({ ...eventForm, title: e.target.value })
//           }
//         />

//         <textarea
//           placeholder="Description"
//           className="border p-2 rounded w-full mb-2"
//           value={eventForm.description}
//           onChange={(e) =>
//             setEventForm({ ...eventForm, description: e.target.value })
//           }
//         />

//         <input
//           type="datetime-local"
//           className="border p-2 rounded w-full mb-2"
//           value={eventForm.eventDate}
//           onChange={(e) =>
//             setEventForm({ ...eventForm, eventDate: e.target.value })
//           }
//         />

//         <input
//           type="text"
//           placeholder="Location"
//           className="border p-2 rounded w-full mb-2"
//           value={eventForm.location}
//           onChange={(e) =>
//             setEventForm({ ...eventForm, location: e.target.value })
//           }
//         />

//         <label className="block mb-2">
//           <input
//             type="checkbox"
//             checked={eventForm.isPaid}
//             onChange={(e) =>
//               setEventForm({ ...eventForm, isPaid: e.target.checked })
//             }
//           />{" "}
//           Paid Event
//         </label>

//         {eventForm.isPaid && (
//           <input
//             type="number"
//             placeholder="Event Fee"
//             className="border p-2 rounded w-full mb-2"
//             value={eventForm.eventFee}
//             onChange={(e) =>
//               setEventForm({ ...eventForm, eventFee: e.target.value })
//             }
//           />
//         )}

//         <input
//           type="number"
//           placeholder="Max Attendees"
//           className="border p-2 rounded w-full mb-2"
//           value={eventForm.maxAttendees}
//           onChange={(e) =>
//             setEventForm({ ...eventForm, maxAttendees: e.target.value })
//           }
//         />

//         <div className="flex gap-2">
//           <button
//             className="bg-blue-600 text-white px-4 py-2 rounded"
//             onClick={handleCreateOrUpdate}
//           >
//             {editingEvent ? "Save Changes" : "Create Event"}
//           </button>
//           {editingEvent && (
//             <button
//               className="bg-gray-500 text-white px-4 py-2 rounded"
//               onClick={handleCancelEdit}
//             >
//               Cancel
//             </button>
//           )}
//         </div>
//       </div>

//       {/* My Events Grid */}
//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {events.length === 0 && <p>No events found</p>}
//         {events.map((event) => (
//           <div
//             key={event._id}
//             className="bg-white p-4 rounded shadow flex flex-col justify-between"
//           >
//             <div>
//               <p className="font-semibold text-lg">{event.title}</p>
//               <p>{new Date(event.eventDate).toLocaleString()}</p>
//               <p>Location: {event.location}</p>
//               <p>
//                 Club:{" "}
//                 {myClubs.find((c) => c._id === event.clubId)?.clubName ||
//                   "Unknown Club"}
//               </p>
//               {event.isPaid && <p>Fee: ${event.eventFee}</p>}
//               <p>Max Attendees: {event.maxAttendees}</p>
//             </div>
//             <div className="flex gap-2 mt-2">
//               <button
//                 className="bg-green-600 text-white px-2 py-1 rounded"
//                 onClick={() => handleEditClick(event)}
//               >
//                 Update
//               </button>
//               <button
//                 className="bg-red-600 text-white px-2 py-1 rounded"
//                 onClick={() => deleteEventMutation.mutate(event._id)}
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default EventsManagement;
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const EventsManagement = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [eventForm, setEventForm] = useState({
    clubId: "",
    title: "",
    description: "",
    eventDate: "",
    location: "",
    isPaid: false,
    eventFee: 0,
    maxAttendees: 0,
    status: "active", // default status
  });

  const [editingEvent, setEditingEvent] = useState(null);

  // ========== Fetch manager's clubs ==========
  const { data: myClubs = [] } = useQuery({
    queryKey: ["managerClubs", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/manager/my-clubs");
      return res.data;
    },
  });

  // ========== Fetch manager's events ==========
  const { data: events = [] } = useQuery({
    queryKey: ["managerEvents", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/manager/my-events");
      return res.data;
    },
  });

  // ========== Create Event ==========
  const createEventMutation = useMutation({
    mutationFn: async (data) => {
      const res = await axiosSecure.post("/manager/create-event", data);
      return res.data;
    },
    onSuccess: () => {
      alert("Event created successfully");
      setEventForm({
        clubId: "",
        title: "",
        description: "",
        eventDate: "",
        location: "",
        isPaid: false,
        eventFee: 0,
        maxAttendees: 0,
        status: "active",
      });
      queryClient.invalidateQueries(["managerEvents", user?.email]);
    },
  });

  // ========== Update Event ==========
  const updateEventMutation = useMutation({
    mutationFn: async ({ id, updatedData }) => {
      const res = await axiosSecure.put(
        `/manager/my-events/${id}`,
        updatedData
      );
      return res.data;
    },
    onSuccess: () => {
      alert("Event updated successfully");
      setEditingEvent(null);
      queryClient.invalidateQueries(["managerEvents", user?.email]);
    },
  });

  // ========== Delete Event ==========
  const deleteEventMutation = useMutation({
    mutationFn: async (id) => {
      if (!window.confirm("Are you sure you want to delete this event?"))
        return;
      const res = await axiosSecure.delete(`/manager/my-events/${id}`);
      return res.data;
    },
    onSuccess: () => {
      alert("Event deleted successfully");
      queryClient.invalidateQueries(["managerEvents", user?.email]);
    },
  });

  // ========== Toggle Status ==========
  const toggleStatus = (event) => {
    const newStatus = event.status === "active" ? "cancelled" : "active";
    updateEventMutation.mutate({
      id: event._id,
      updatedData: { ...event, status: newStatus },
    });
  };

  const handleCreateOrUpdate = () => {
    if (!eventForm.clubId) return alert("Select a club");
    if (!eventForm.title) return alert("Enter event title");
    if (!eventForm.eventDate) return alert("Enter event date");
    if (eventForm.isPaid && (!eventForm.eventFee || eventForm.eventFee <= 0))
      return alert("Enter a valid event fee");
    if (!eventForm.maxAttendees || eventForm.maxAttendees <= 0)
      return alert("Enter max attendees");

    const payload = {
      ...eventForm,
      eventFee: eventForm.isPaid ? Number(eventForm.eventFee) : 0,
      maxAttendees: Number(eventForm.maxAttendees),
    };

    if (editingEvent) {
      updateEventMutation.mutate({
        id: editingEvent._id,
        updatedData: payload,
      });
    } else {
      createEventMutation.mutate(payload);
    }
  };

  const handleEditClick = (event) => {
    setEditingEvent(event);
    setEventForm({
      clubId: event.clubId,
      title: event.title,
      description: event.description,
      eventDate: new Date(event.eventDate).toISOString().slice(0, 16),
      location: event.location,
      isPaid: event.isPaid,
      eventFee: event.eventFee || 0,
      maxAttendees: event.maxAttendees || 0,
      status: event.status || "active",
    });
  };

  const handleCancelEdit = () => {
    setEditingEvent(null);
    setEventForm({
      clubId: "",
      title: "",
      description: "",
      eventDate: "",
      location: "",
      isPaid: false,
      eventFee: 0,
      maxAttendees: 0,
      status: "active",
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Events Management</h1>

      {/* Create / Edit Event Form */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">
          {editingEvent ? "Edit Event" : "Create Event"}
        </h2>

        <select
          className="border p-2 rounded w-full mb-2"
          value={eventForm.clubId}
          onChange={(e) =>
            setEventForm({ ...eventForm, clubId: e.target.value })
          }
        >
          <option value="">Select Approved Club</option>
          {myClubs.map((club) => (
            <option key={club._id} value={club._id}>
              {club.clubName}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Event Title"
          className="border p-2 rounded w-full mb-2"
          value={eventForm.title}
          onChange={(e) =>
            setEventForm({ ...eventForm, title: e.target.value })
          }
        />

        <textarea
          placeholder="Description"
          className="border p-2 rounded w-full mb-2"
          value={eventForm.description}
          onChange={(e) =>
            setEventForm({ ...eventForm, description: e.target.value })
          }
        />

        <input
          type="datetime-local"
          className="border p-2 rounded w-full mb-2"
          value={eventForm.eventDate}
          onChange={(e) =>
            setEventForm({ ...eventForm, eventDate: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Location"
          className="border p-2 rounded w-full mb-2"
          value={eventForm.location}
          onChange={(e) =>
            setEventForm({ ...eventForm, location: e.target.value })
          }
        />

        <label className="block mb-2">
          <input
            type="checkbox"
            checked={eventForm.isPaid}
            onChange={(e) =>
              setEventForm({ ...eventForm, isPaid: e.target.checked })
            }
          />{" "}
          Paid Event
        </label>

        {eventForm.isPaid && (
          <input
            type="number"
            placeholder="Event Fee"
            className="border p-2 rounded w-full mb-2"
            value={eventForm.eventFee}
            onChange={(e) =>
              setEventForm({ ...eventForm, eventFee: e.target.value })
            }
          />
        )}

        <input
          type="number"
          placeholder="Max Attendees"
          className="border p-2 rounded w-full mb-2"
          value={eventForm.maxAttendees}
          onChange={(e) =>
            setEventForm({ ...eventForm, maxAttendees: e.target.value })
          }
        />

        <div className="flex gap-2">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handleCreateOrUpdate}
          >
            {editingEvent ? "Save Changes" : "Create Event"}
          </button>
          {editingEvent && (
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded"
              onClick={handleCancelEdit}
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* My Events Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.length === 0 && <p>No events found</p>}
        {events.map((event) => (
          <div
            key={event._id}
            className="bg-white p-4 rounded shadow flex flex-col justify-between"
          >
            <div>
              <p className="font-semibold text-lg">{event.title}</p>
              <p>{new Date(event.eventDate).toLocaleString()}</p>
              <p>Location: {event.location}</p>
              <p>
                Club:{" "}
                {myClubs.find((c) => c._id === event.clubId)?.clubName ||
                  "Unknown Club"}
              </p>
              {event.isPaid && <p>Fee: ${event.eventFee}</p>}
              <p>Max Attendees: {event.maxAttendees}</p>
              <p>Status: {event.status || "active"}</p>
            </div>
            <div className="flex gap-2 mt-2">
              <button
                className="bg-green-600 text-white px-2 py-1 rounded"
                onClick={() => handleEditClick(event)}
              >
                Update
              </button>
              <button
                className="bg-yellow-600 text-white px-2 py-1 rounded"
                onClick={() => toggleStatus(event)}
              >
                {event.status === "active" ? "Cancel" : "Activate"}
              </button>
              <button
                className="bg-red-600 text-white px-2 py-1 rounded"
                onClick={() => deleteEventMutation.mutate(event._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsManagement;
