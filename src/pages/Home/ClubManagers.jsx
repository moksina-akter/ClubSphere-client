import React from "react";

const ClubManagers = () => {
  const managers = [
    {
      id: 1,
      name: "Ahsan Habib",
      role: "Lead Manager",
      club: "ByteForce Developers",
      image:
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "Sanjida Akter",
      role: "Event Coordinator",
      club: "Drama & Theater Club",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
    },
    {
      id: 3,
      name: "Rakib Hasan",
      role: "Community Builder",
      club: "Fitness Enthusiasts",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    },
  ];

  return (
    <section className="py-16 bg-base-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-neutral">
            Meet Our <span className="text-orange-500">Club Managers</span>
          </h2>
          <p className="text-gray-500 mt-2 max-w-md mx-auto">
            The passionate minds leading and growing our vibrant community hubs.
          </p>
        </div>

        {/* Managers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {managers.map((manager) => (
            <div
              key={manager.id}
              className="card bg-base-100 border border-base-200 shadow-sm hover:shadow-md transition-all duration-300 p-6 text-center group"
            >
              {/* Profile Image with Ring */}
              <div className="avatar justify-center mb-4">
                <div className="w-24 rounded-full ring ring-orange-500 ring-offset-base-100 ring-offset-2 group-hover:scale-105 transition-transform duration-300">
                  <img src={manager.image} alt={manager.name} />
                </div>
              </div>

              {/* Identity */}
              <h3 className="text-xl font-bold text-neutral group-hover:text-orange-500 transition-colors">
                {manager.name}
              </h3>
              <p className="text-xs font-semibold uppercase tracking-wider text-orange-500 mt-1">
                {manager.role}
              </p>

              {/* Divider */}
              <div className="divider my-2 opacity-50"></div>

              {/* Associated Club */}
              <p className="text-sm text-gray-500 font-medium">
                Club: <span className="text-neutral">{manager.club}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClubManagers;
