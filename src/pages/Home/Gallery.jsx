import React from "react";

const Gallery = () => {
  const photos = [
    {
      id: 1,
      title: "Tech Meetup 2026",
      tag: "Workshops",
      src: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Cultural Night",
      tag: "Drama",
      src: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Morning Trekking",
      tag: "Adventure",
      src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 4,
      title: "Football Finals",
      tag: "Sports",
      src: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=600&auto=format&fit=crop",
    },
  ];

  return (
    <section className="py-16 bg-base-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-neutral">
            Moments From <span className="text-orange-500">Our Clubs</span>
          </h2>
          <p className="text-gray-500 mt-2 max-w-md mx-auto">
            A glimpse into the amazing events, friendships, and memories created
            here.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="relative h-64 overflow-hidden rounded-2xl group shadow-md bg-neutral"
            >
              {/* Image */}
              <img
                src={photo.src}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-110 group-hover:opacity-40 transition-all duration-500"
              />

              {/* Overlay Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <span className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-1">
                  {photo.tag}
                </span>
                <h3 className="text-lg font-bold text-white">{photo.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
