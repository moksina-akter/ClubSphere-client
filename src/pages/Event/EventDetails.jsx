// import React, { useEffect, useState } from "react";
// import { useParams, useSearchParams } from "react-router";
// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import useAuth from "../../hooks/useAuth";
// import Container from "../../components/Shared/Container";
// import toast from "react-hot-toast";

// const EventDetails = () => {
//   const { id } = useParams();
//   const { firebaseUser } = useAuth();
//   const axiosSecure = useAxiosSecure();
//   const queryClient = useQueryClient();
//   const [clubName, setClubName] = useState("");
//   const [searchParams] = useSearchParams();

//   // 🔹 Fetch event
//   const {
//     data: event,
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ["event", id],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/events/${id}`);
//       return res.data;
//     },
//   });

//   // 🔹 Fetch club safely
//   useEffect(() => {
//     if (event?.clubId && event.clubId.length === 24) {
//       axiosSecure
//         .get(`/club/${event.clubId}`)
//         .then((res) => setClubName(res.data?.clubName || "Unknown Club"))
//         .catch(() => setClubName("Unknown Club"));
//     }
//   }, [event, axiosSecure]);

//   // 🔹 Stripe success handler
//   useEffect(() => {
//     const sessionId = searchParams.get("session_id");
//     if (sessionId && firebaseUser) {
//       axiosSecure
//         .post(`/events/payment-success`, { sessionId })
//         .then(() => {
//           toast.success("Payment successful! Event joined ");
//           queryClient.invalidateQueries(["myEvents"]);
//           queryClient.invalidateQueries(["event", id]);
//         })
//         .catch((err) => {
//           toast.error(
//             err.response?.data?.message || "Payment verification failed"
//           );
//         });
//     }
//   }, [searchParams, firebaseUser, axiosSecure, queryClient, id]);

//   //  Register handler
//   const handleRegister = async () => {
//     if (!firebaseUser) {
//       toast.error("Please login first");
//       return;
//     }

//     try {
//       const feeAmount = Number(event?.eventFee ?? 0);
//       const isPaidEvent = event?.isPaid === true && Number(event?.eventFee) > 0;
//       if (!isPaidEvent) {
//         // free event join
//       }

//       //  Free Event
//       if (!event.isPaid || feeAmount === 0) {
//         await axiosSecure.post(`/events/${id}/register`);
//         toast.success("Successfully joined free event ");
//         queryClient.invalidateQueries(["myEvents"]);
//         queryClient.invalidateQueries(["event", id]);
//         return;
//       }

//       //  Paid Event
//       const res = await axiosSecure.post(`/events/create-checkout-session`, {
//         eventId: event._id,
//       });

//       if (res.data?.url) {
//         window.location.href = res.data.url;
//       } else {
//         toast.error(res.data?.message || "Stripe session failed");
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Registration failed");
//     }
//   };

//   if (isLoading) return <p>Loading...</p>;
//   if (isError || !event) return <p>Failed to load event</p>;

//   const feeAmount = Number(event?.eventFee ?? 0);

//   return (
//     <Container>
//       <div className="max-w-3xl mx-auto p-6">
//         <h1 className="text-3xl font-bold">{event.title}</h1>

//         <p className="text-gray-500 mt-1">
//           {new Date(event.createdAt).toLocaleString()}
//         </p>

//         <p className="mt-3">{event.description}</p>

//         <p className="mt-2 font-medium"> Location: {event.location}</p>
//         <p className="mt-2 font-medium"> Club: {clubName}</p>
//         <p className="mt-2 font-medium">
//           {feeAmount > 0 ? `Fee: ৳${feeAmount}` : "Free Event"}
//         </p>

//         <button
//           onClick={handleRegister}
//           className="mt-5 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
//         >
//           {feeAmount > 0 ? "Pay & Join Event" : "Join Event"}
//         </button>
//       </div>
//     </Container>
//   );
// };

// export default EventDetails;

// import React, { useEffect, useState } from "react";
// import { useParams, useSearchParams } from "react-router";
// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import useAuth from "../../hooks/useAuth";
// import Container from "../../components/Shared/Container";
// import toast from "react-hot-toast";

// const EventDetails = () => {
//   const { id } = useParams();
//   const { firebaseUser } = useAuth();
//   const axiosSecure = useAxiosSecure();
//   const queryClient = useQueryClient();
//   const [clubName, setClubName] = useState("");
//   const [searchParams] = useSearchParams();

//   // 🔹 Fetch event
//   const {
//     data: event,
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ["event", id],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/events/${id}`);
//       return res.data;
//     },
//   });

//   //  Fetch club name
//   useEffect(() => {
//     if (event?.clubId && event.clubId.length === 24) {
//       axiosSecure
//         .get(`/club/${event.clubId}`)
//         .then((res) => setClubName(res.data?.clubName || "Unknown Club"))
//         .catch(() => setClubName("Unknown Club"));
//     }
//   }, [event, axiosSecure]);

//   //  Stripe success handler
//   useEffect(() => {
//     const sessionId = searchParams.get("session_id");
//     if (sessionId && firebaseUser) {
//       axiosSecure
//         .post(`/events/payment-success`, { sessionId })
//         .then(() => {
//           toast.success("Payment successful! Event joined ");
//           queryClient.invalidateQueries(["myEvents"]);
//           queryClient.invalidateQueries(["event", id]);
//         })
//         .catch((err) => {
//           toast.error(
//             err.response?.data?.message || "Payment verification failed"
//           );
//         });
//     }
//   }, [searchParams, firebaseUser, axiosSecure, queryClient, id]);

//   //  Register handler (FINAL LOGIC)
//   const handleRegister = async () => {
//     if (!firebaseUser) {
//       toast.error("Please login first");
//       return;
//     }

//     try {
//       const feeAmount = Number(event?.eventFee ?? 0);
//       const isPaidEvent = event?.isPaid === true && feeAmount > 0;

//       //  FREE EVENT
//       if (!isPaidEvent) {
//         await axiosSecure.post(`/events/${id}/register`);
//         toast.success("Successfully joined free event ");
//         queryClient.invalidateQueries(["myEvents"]);
//         queryClient.invalidateQueries(["event", id]);
//         return;
//       }

//       //  PAID EVENT → STRIPE
//       const res = await axiosSecure.post(`/events/create-checkout-session`, {
//         eventId: event._id,
//       });

//       if (res.data?.url) {
//         window.location.href = res.data.url;
//       } else {
//         toast.error("Stripe session creation failed");
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Registration failed");
//     }
//   };

//   if (isLoading) return <p>Loading...</p>;
//   if (isError || !event) return <p>Failed to load event</p>;

//   const feeAmount = Number(event?.eventFee ?? 0);

//   return (
//     <Container>
//       <div className="max-w-3xl mx-auto mt-6 mb-0  rounded p-6">
//         <h1 className="text-3xl font-bold">{event.title}</h1>

//         <p className="text-gray-500 mt-1">
//           {new Date(event.createdAt).toLocaleString()}
//         </p>

//         <p className="mt-3">{event.description}</p>

//         <p className="mt-2 font-medium">Location: {event.location}</p>
//         <p className="mt-2 font-medium">Club: {clubName}</p>
//         <p className="mt-2 font-medium">
//           {feeAmount > 0 ? `Fee: ৳${feeAmount}` : "Free Event"}
//         </p>

//         <button
//           onClick={handleRegister}
//           className="mt-5 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
//         >
//           {feeAmount > 0 ? "Pay & Join Event" : "Join Event"}
//         </button>
//       </div>
//     </Container>
//   );
// };

// export default EventDetails;
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Container from "../../components/Shared/Container";
import toast from "react-hot-toast";

const EventDetails = () => {
  const { id } = useParams();
  const { firebaseUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [clubName, setClubName] = useState("");
  const [searchParams] = useSearchParams();

  // 🔹 Fetch event
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

  // 🔹 Fetch club name safely
  useEffect(() => {
    if (!event) return;

    let clubId = event.clubId;
    if (typeof clubId === "object" && clubId?._id) {
      clubId = clubId._id;
    }

    if (clubId && clubId.length === 24) {
      axiosSecure
        .get(`/club/${clubId}`)
        .then((res) => setClubName(res.data?.clubName || "Unknown Club"))
        .catch(() => setClubName("Unknown Club"));
    }
  }, [event, axiosSecure]);

  // 🔹 Stripe success handler
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
        .catch((err) => {
          toast.error(
            err.response?.data?.message || "Payment verification failed"
          );
        });
    }
  }, [searchParams, firebaseUser, axiosSecure, queryClient, id]);

  // 🔹 Register handler
  const handleRegister = async () => {
    if (!firebaseUser) {
      toast.error("Please login first");
      return;
    }

    if (!event) return;

    try {
      const feeAmount = Number(event?.eventFee ?? 0);
      const isPaidEvent = !!event?.isPaid && feeAmount > 0;

      //  FREE EVENT
      if (!isPaidEvent) {
        const res = await axiosSecure.post(`/events/${id}/register`);
        if (res.status === 200) {
          toast.success("Successfully joined free event");
          queryClient.invalidateQueries(["myEvents"]);
          queryClient.invalidateQueries(["event", id]);
        } else {
          toast.error("Failed to join event");
        }
        return;
      }

      //  PAID EVENT → STRIPE
      const res = await axiosSecure.post(`/events/create-checkout-session`, {
        eventId: event._id,
      });

      if (res.data?.url) {
        window.location.href = res.data.url;
      } else {
        toast.error("Stripe session creation failed");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError || !event) return <p>Failed to load event</p>;

  const feeAmount = Number(event?.eventFee ?? 0);

  return (
    <Container>
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold">{event.title}</h1>
        <p className="text-gray-500 mt-1">
          {new Date(event.createdAt).toLocaleString()}
        </p>
        <p className="mt-3">{event.description}</p>
        <p className="mt-2 font-medium">Location: {event.location}</p>
        <p className="mt-2 font-medium">Club: {clubName}</p>
        <p className="mt-2 font-medium">
          {feeAmount > 0 ? `Fee: ৳${feeAmount}` : "Free Event"}
        </p>

        <button
          onClick={handleRegister}
          className="mt-5 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          {feeAmount > 0 ? "Pay & Join Event" : "Join Event"}
        </button>
      </div>
    </Container>
  );
};

export default EventDetails;
