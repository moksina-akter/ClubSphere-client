import React from "react";

const Pricing = () => {
  return (
    <section className="py-16 bg-base-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-neutral">
            Choose Your <span className="text-orange-500">Membership Plan</span>
          </h2>
          <p className="text-gray-500 mt-2 max-w-md mx-auto">
            Unlock premium features, exclusive workshops, and deeper community
            connections.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Plan 1: Free */}
          <div className="card bg-base-100 border border-base-200 p-8 shadow-sm rounded-2xl hover:shadow-md transition-all">
            <h3 className="text-xl font-bold text-neutral">Basic</h3>
            <p className="text-gray-400 text-sm mt-1">
              For casual club explorers
            </p>
            <div className="my-6">
              <span className="text-4xl font-extrabold text-neutral">$0</span>
              <span className="text-gray-500 text-sm"> / month</span>
            </div>
            <ul className="space-y-3 text-sm text-gray-600 mb-8">
              <li className="flex items-center gap-2">
                ✓ Join up to 3 public clubs
              </li>
              <li className="flex items-center gap-2">
                ✓ Attend free public events
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                ✕ No premium workshops
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                ✕ No custom club creation
              </li>
            </ul>
            <button className="btn btn-outline btn-neutral w-full">
              Get Started
            </button>
          </div>

          {/* Plan 2: Pro (Highlighted) */}
          <div className="card bg-base-100 border-2 border-orange-500 p-8 shadow-xl rounded-2xl relative md:scale-105 z-10">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs font-bold uppercase tracking-widest px-4 py-1 rounded-full">
              Most Popular
            </span>
            <h3 className="text-xl font-bold text-neutral">Pro Clubber</h3>
            <p className="text-gray-400 text-sm mt-1">
              For dedicated community seekers
            </p>
            <div className="my-6">
              <span className="text-4xl font-extrabold text-neutral">$9</span>
              <span className="text-gray-500 text-sm"> / month</span>
            </div>
            <ul className="space-y-3 text-sm text-gray-600 mb-8">
              <li className="flex items-center gap-2">
                ✓ Join unlimited clubs
              </li>
              <li className="flex items-center gap-2">
                ✓ Priority access to all events
              </li>
              <li className="flex items-center gap-2">
                ✓ Premium workshops & certificates
              </li>
              <li className="flex items-center gap-2">
                ✓ Create up to 2 public clubs
              </li>
            </ul>
            <button className="btn bg-orange-500 hover:bg-orange-600 text-white w-full border-none shadow-md">
              Upgrade to Pro
            </button>
          </div>

          {/* Plan 3: Ultimate */}
          <div className="card bg-base-100 border border-base-200 p-8 shadow-sm rounded-2xl hover:shadow-md transition-all">
            <h3 className="text-xl font-bold text-neutral">Elite Manager</h3>
            <p className="text-gray-400 text-sm mt-1">
              For massive community builders
            </p>
            <div className="my-6">
              <span className="text-4xl font-extrabold text-neutral">$24</span>
              <span className="text-gray-500 text-sm"> / month</span>
            </div>
            <ul className="space-y-3 text-sm text-gray-600 mb-8">
              <li className="flex items-center gap-2">
                ✓ Everything in Pro plan
              </li>
              <li className="flex items-center gap-2">
                ✓ Create unlimited clubs
              </li>
              <li className="flex items-center gap-2">
                ✓ Advanced analytics & tools
              </li>
              <li className="flex items-center gap-2">
                ✓ Dedicated 24/7 support
              </li>
            </ul>
            <button className="btn btn-outline btn-neutral w-full">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
