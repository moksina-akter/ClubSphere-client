import React from "react";

const UpcomingEvents = () => {
  const events = [
    {
      id: 1,
      title: "Photography Workshop 2026",
      club: "LensCraft Club",
      date: "July 25, 2026",
      time: "4:00 PM",
      location: "Dhaka",
      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "National Tech Fest",
      club: "ByteForce Developers",
      date: "August 02, 2026",
      time: "10:00 AM",
      location: "Sylhet",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Annual Football Tournament",
      club: "Strikers FC",
      date: "August 10, 2026",
      time: "3:30 PM",
      location: "Chittagong",
      image:
        "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=600&auto=format&fit=crop",
    },
  ];

  return (
    <section className="py-16 bg-base-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-neutral">
            Upcoming <span className="text-orange-500">Events</span>
          </h2>
          <p className="text-gray-500 mt-2 max-w-md mx-auto">
            Don't miss out! Join the most happening events organized by your
            favorite clubs.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="card bg-base-100 shadow-xl border border-base-300 hover:shadow-2xl transition-all duration-300 group"
            >
              {/* Image & Date Badge */}
              <figure className="relative h-48 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                  {event.date}
                </div>
              </figure>

              {/* Card Body */}
              <div className="card-body p-6">
                <span className="text-xs font-semibold text-orange-500 uppercase tracking-wider">
                  {event.club}
                </span>
                <h3 className="card-title text-xl font-bold text-neutral mt-1 group-hover:text-orange-500 transition-colors">
                  {event.title}
                </h3>

                {/* Event Details */}
                <div className="flex flex-col gap-2 mt-4 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>{event.location}</span>
                  </div>
                </div>

                {/* Action Button */}
                <div className="card-actions justify-end mt-6">
                  <button className="btn bg-orange-500 hover:bg-orange-600 text-white w-full border-none">
                    Join Event
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
