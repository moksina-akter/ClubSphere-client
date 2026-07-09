import React, { useState } from "react";

const FAQWithNewsletter = () => {
  const [email, setEmail] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();

    console.log("Subscribed email:", email);

    setShowToast(true);

    setEmail("");

    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <section className="py-16 bg-base-100 border-t border-base-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column: FAQ Accordion */}
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-neutral mb-2">
              Frequently Asked{" "}
              <span className="text-orange-500">Questions</span>
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Got questions about ClubSphere? We've got answers.
            </p>

            <div className="space-y-3">
              {/* FAQ 1 */}
              <div className="collapse collapse-plus bg-base-200 rounded-xl border border-base-300">
                <input type="radio" name="my-accordion-3" defaultChecked />
                <div className="collapse-title text-base font-bold text-neutral">
                  Is it free to join a club on ClubSphere?
                </div>
                <div className="collapse-content text-sm text-gray-600">
                  <p>
                    Yes! Most clubs on our platform are completely free to join.
                    However, some special premium clubs or paid events may
                    require a small membership fee.
                  </p>
                </div>
              </div>

              {/* FAQ 2 */}
              <div className="collapse collapse-plus bg-base-200 rounded-xl border border-base-300">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title text-base font-bold text-neutral">
                  How can I create my own club?
                </div>
                <div className="collapse-content text-sm text-gray-600">
                  <p>
                    Simply sign up, click on the "Create a Club" button in the
                    Hero area or your dashboard, fill up the details, and submit
                    it for review!
                  </p>
                </div>
              </div>

              {/* FAQ 3 */}
              <div className="collapse collapse-plus bg-base-200 rounded-xl border border-base-300">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title text-base font-bold text-neutral">
                  Can I leave a club after joining?
                </div>
                <div className="collapse-content text-sm text-gray-600">
                  <p>
                    Of course! You have complete control. You can leave a club
                    at any time directly from your user dashboard with a single
                    click.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Newsletter Subscription Box */}
          <div className="p-8 rounded-3xl border border-orange-200 lg:mt-12 bg-gradient-to-br from-orange-50/50 to-transparent">
            <h3 className="text-xl font-bold text-neutral">
              Stay Updated with{" "}
              <span className="text-orange-500">ClubSphere</span>
            </h3>
            <p className="text-sm text-gray-600 mt-2 mb-6 leading-relaxed">
              Subscribe to our weekly newsletter to receive updates on upcoming
              events, popular clubs, and fresh announcements directly in your
              box.
            </p>

            {/* Subscription Form */}
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-3"
            >
              <input
                type="email"
                placeholder="Enter your email address"
                className="input input-bordered w-full focus:outline-orange-500 text-sm bg-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="btn bg-orange-500 hover:bg-orange-600 text-white border-none px-6"
              >
                Subscribe
              </button>
            </form>

            <p className="text-xs text-gray-400 mt-3">
              We care about your data. No spam, ever. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>

      {/* DaisyUI Alert Toast Success Message */}
      {showToast && (
        <div className="toast toast-end z-50">
          <div className="alert alert-success shadow-lg text-white bg-green-600 border-none">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="font-semibold text-sm">
                Successfully subscribed to newsletter!
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FAQWithNewsletter;
