import React from "react";

const Statistics = () => {
  return (
    <section className="py-12 bg-base-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="stats stats-vertical lg:stats-horizontal shadow w-full border border-base-200">
          <div className="stat text-center lg:text-left">
            <div className="stat-title text-gray-500 font-medium">
              Active Clubs
            </div>
            <div className="stat-value text-primary text-3xl md:text-4xl font-extrabold mt-1">
              120+
            </div>
            <div className="stat-desc text-gray-400 mt-1">
              Across 15+ categories
            </div>
          </div>

          <div className="stat text-center lg:text-left">
            <div className="stat-title text-gray-500 font-medium">
              Total Members
            </div>
            <div className="stat-value text-secondary text-3xl md:text-4xl font-extrabold mt-1">
              4,500+
            </div>
            <div className="stat-desc text-gray-400 mt-1">
              Growing every single day
            </div>
          </div>

          <div className="stat text-center lg:text-left">
            <div className="stat-title text-gray-500 font-medium">
              Events Hosted
            </div>
            <div className="stat-value text-accent text-3xl md:text-4xl font-extrabold mt-1">
              850+
            </div>
            <div className="stat-desc text-gray-400 mt-1">
              Successful workshops & meets
            </div>
          </div>

          <div className="stat text-center lg:text-left">
            <div className="stat-title text-gray-500 font-medium">
              Club Managers
            </div>
            <div className="stat-value text-orange-500 text-3xl md:text-4xl font-extrabold mt-1">
              90+
            </div>
            <div className="stat-desc text-gray-400 mt-1">
              Dedicated community leaders
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
