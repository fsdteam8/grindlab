import { useState, useEffect, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

type Testimonial = {
  quote: string;
  name: string;
  location: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "I've been ordering from TABLEFRESH for over year now, and the quality of their organic produce is consistently excellent. The convenience of having fresh, organic food delivered to my door has made healthy eating so much easier for my family.",
    name: "Sarah Johnson",
    location: "Portland, OR",
  },
  {
    quote:
      "I've been ordering from TABLEFRESH for over year now, and the quality of their organic produce is consistently excellent. The convenience of having fresh, organic food delivered to my door has made healthy eating so much easier for my family.",
    name: "Sarah Johnson",
    location: "Portland, OR",
  },
  {
    quote:
      "I've been ordering from TABLEFRESH for over year now, and the quality of their organic produce is consistently excellent. The convenience of having fresh, organic food delivered to my door has made healthy eating so much easier for my family.",
    name: "Sarah Johnson",
    location: "Portland, OR",
  },
  {
    quote:
      "I've been ordering from TABLEFRESH for over year now, and the quality of their organic produce is consistently excellent. The convenience of having fresh, organic food delivered to my door has made healthy eating so much easier for my family.",
    name: "Sarah Johnson",
    location: "Portland, OR",
  },
  {
    quote:
      "I've been ordering from TABLEFRESH for over year now, and the quality of their organic produce is consistently excellent. The convenience of having fresh, organic food delivered to my door has made healthy eating so much easier for my family.",
    name: "Sarah Johnson",
    location: "Portland, OR",
  },
];

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);

  // Calculate items per view based on screen size
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth >= 1280) {
        setItemsPerView(4); // xl: 4 items
      } else if (window.innerWidth >= 1024) {
        setItemsPerView(3); // lg: 3 items
      } else if (window.innerWidth >= 640) {
        setItemsPerView(2); // sm: 2 items
      } else {
        setItemsPerView(1); // mobile: 1 item
      }
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const maxIndex = Math.max(0, testimonials.length - itemsPerView);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(nextSlide, 4500);
    return () => clearInterval(interval);
  }, [isPlaying, nextSlide]);

  // Pause on hover
  const handleMouseEnter = () => setIsPlaying(false);
  const handleMouseLeave = () => setIsPlaying(true);

  // Touch/swipe support
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  return (
    <div className="w-full">
      <div className=" mx-auto">
        {/* Header with navigation */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl md:text-[48px] font-bold font-primary leading-[120%] tracking-[0%] text-[#D9D9D9] mb-6">
            What Partners Say
          </h2>

          {/* Navigation arrows */}
          <div className="flex gap-3">
            <button
              onClick={prevSlide}
              className="w-10 h-10 bg-transparent border border-green-500/50 hover:border-green-500 rounded-full flex items-center justify-center transition-colors duration-200"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4 text-green-500" />
            </button>

            <button
              onClick={nextSlide}
              className="w-10 h-10 bg-transparent border border-green-500/50 hover:border-green-500 rounded-full flex items-center justify-center transition-colors duration-200"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4 text-green-500" />
            </button>
          </div>
        </div>

        {/* Carousel container */}
        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / itemsPerView)
                }%)`,
                width: `${(testimonials.length * 100) / itemsPerView}%`,
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 px-3 lg:px-4"
                  style={{ width: `${100 / testimonials.length}%` }}
                >
                  <div className="bg-zinc-900/80 backdrop-blur-sm rounded-2xl p-6 lg:p-6 h-full min-h-[300px] flex flex-col">
                    {/* Stars */}
                    <div className="flex items-center gap-1 mb-4">
                      {Array.from({ length: 4 }, (_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-[limegreen] text-[limegreen] opacity-80"
                        />
                      ))}
                      <Star className="w-4 h-4 text-gray-500" />
                    </div>

                    {/* Quote */}
                    <div className="flex-1 mb-8">
                      <p className="text-white text-base leading-[150%] font-light">
                        &quot;{testimonial.quote}&quot;
                      </p>
                    </div>

                    {/* Author */}
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-medium text-sm">
                          {testimonial.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-white md:text-[20px] text-base">
                          {testimonial.name}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {testimonial.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
