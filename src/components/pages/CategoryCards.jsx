import { useRef } from "react";
import {
  FaShoppingBasket,
  FaDrumstickBite,
  FaPepperHot,
  FaBreadSlice,
  FaBoxOpen,
  FaMugHot,
  FaCoffee,
  FaIceCream,
  FaSnowflake,
  FaCandyCane,
  FaWineBottle,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

export default function CategoryCards() {
  const categories = [
    { name: "Atta, Rice\nOil & Dals", icon: <FaShoppingBasket /> },
    { name: "Meat, Fish\n& Eggs", icon: <FaDrumstickBite /> },
    { name: "Masala &\nDry Fruits", icon: <FaPepperHot /> },
    { name: "Breakfast &\nSauces", icon: <FaBreadSlice /> },
    { name: "Packaged\nFood", icon: <FaBoxOpen /> },
    { name: "Zeggo\nCafe", icon: <FaMugHot /> },
    { name: "Tea, Coffee\n& More", icon: <FaCoffee /> },
    { name: "Ice Creams\n& More", icon: <FaIceCream /> },
    { name: "Frozen\nFood", icon: <FaSnowflake /> },
    { name: "Sweet\nCravings", icon: <FaCandyCane /> },
    { name: "Cold Drinks\n& Juices", icon: <FaWineBottle /> },
  ];

  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 150; // Adjust scroll distance
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full bg-white py-8 font-inter">
      <div className="max-w-7xl mx-auto px-6 relative">

        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10
                     bg-white shadow-lg rounded-full w-10 h-10
                     flex items-center justify-center hover:scale-105 transition"
        >
          <FaChevronLeft size={16} />
        </button>

        {/* Categories */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto px-12 scrollbar-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {categories.map((cat, index) => (
            <div
              key={index}
              className="min-w-[120px] flex flex-col items-center gap-3
                         cursor-pointer group"
            >
              <div
                className="w-[90px] h-[90px] rounded-2xl
                           bg-gradient-to-br from-gray-100 to-gray-50
                           flex items-center justify-center
                           text-[34px] text-purple-600
                           group-hover:scale-110 transition"
              >
                {cat.icon}
              </div>

              <p className="text-[14.5px] font-semibold text-center leading-tight whitespace-pre-line text-gray-800">
                {cat.name}
              </p>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10
                     bg-white shadow-lg rounded-full w-10 h-10
                     flex items-center justify-center hover:scale-105 transition"
        >
          <FaChevronRight size={16} />
        </button>

      </div>
    </div>
  );
}
