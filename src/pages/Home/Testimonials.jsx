import React from "react";

const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      name: "Tanjim Ahmed",
      role: "Member since 2025",
      text: "ClubSphere has completely changed how I connect with people at university. Finding coding clubs was incredibly simple, and the tech fests are mind-blowing!",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "Fariha Islam",
      role: "Drama Club Lead",
      text: "As a club manager, hosting events and managing memberships used to be a nightmare. ClubSphere made everything automated so we can focus strictly on our performances.",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    },
    {
      id: 3,
      name: "Naimur Rahman",
      role: "Fitness Enthusiast",
      text: "I joined the weekend hiking and gym groups here. The community is so supportive and regular. Highly recommended platform for everyone looking for active circles!",
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop",
    },
  ];

  return (
    <section className="py-16 bg-base-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-neutral">
            What Our <span className="text-orange-500">Community Says</span>
          </h2>
          <p className="text-gray-500 mt-2 max-w-md mx-auto">
            Real stories and feedback from active members and dedicated club
            leaders.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="card bg-base-100 p-6 shadow-sm border border-base-300 rounded-2xl flex flex-col justify-between"
            >
              {/* Review Text */}
              <p className="text-gray-600 italic text-sm leading-relaxed mb-6">
                "{review.text}"
              </p>

              {/* User Identity */}
              <div className="flex items-center gap-4">
                <div className="avatar">
                  <div className="w-12 rounded-full">
                    <img src={review.image} alt={review.name} />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-neutral text-base">
                    {review.name}
                  </h4>
                  <p className="text-xs text-orange-500 font-medium">
                    {review.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
