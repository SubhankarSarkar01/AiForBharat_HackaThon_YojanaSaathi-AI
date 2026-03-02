import React, { useState, useEffect } from "react";

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1600&q=80",
      caption: "Empowering Indian Farmers with Agricultural Schemes",
    },
    {
      image:
        "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      caption: "Supporting Students with Education Scholarships",
    },
    {
      image:
        "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      caption: "Driving Women Empowerment Initiatives",
    },
    {
      image:
        "https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?auto=format&fit=crop&w=1600&q=80",
      caption: "Transforming Rural India Through Development",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative w-full max-w-7xl mx-auto mt-8 mb-16 overflow-hidden rounded-2xl shadow-xl">
      <div
        className="flex transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="w-full flex-shrink-0 relative h-[400px] md:h-[500px]"
          >
            <img
              src={slide.image}
              alt={slide.caption}
              className="w-full h-full object-cover"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent"></div>

            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-center">
              <h3 className="text-2xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">
                {slide.caption}
              </h3>
              <div className="w-24 h-1 bg-saffron mx-auto rounded-full mt-4"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? "bg-saffron w-8"
                : "bg-white/60 hover:bg-white"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
