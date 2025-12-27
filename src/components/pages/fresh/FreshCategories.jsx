import React, { useState } from "react";
import VegetableProductCarousel from "./VegetableProductCarousel";
import SEO from "../../custom/SEO";

const categories = [
  { name: "Vegetables", icon: "🥕" },
  { name: "Fruits", icon: "🍎" },
  { name: "₹9 Zone", icon: "₹9" },
  { name: "New Launches", icon: "🆕" },
  { name: "Exotics", icon: "🥝" },
];

export default function FreshCategory() {
  const [active, setActive] = useState("Vegetables");

  return (
    <>
      <SEO 
        title="Fresh Fruits & Vegetables Online - Buy Fresh Produce at Best Prices | Zeggo"
        description="Shop fresh fruits & vegetables online at Zeggo. Get fresh produce with fast delivery. Best prices for organic & regular fruits & vegetables."
        keywords="fresh fruits, fresh vegetables, organic fruits, organic vegetables, online grocery, fresh produce delivery"
      />
    <div className="w-full bg-white border-b">
      <div className="max-w-7xl mx-auto px-6">
        <div
          className="
            flex items-center gap-8
            overflow-x-auto
            scrollbar-hide
            py-5
            justify-start md:justify-center
          "
        >
          {categories.map((item) => {
            const isActive = active === item.name;

            return (
              <button
                key={item.name}
                onClick={() => setActive(item.name)}
                className="flex flex-col items-center min-w-[96px] focus:outline-none"
              >
                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center
                  text-xl font-bold transition-all duration-300
                  ${
                    isActive
                      ? "bg-pink-100 text-pink-600 scale-105 shadow-sm"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {item.icon}
                </div>

                {/* Text */}
                <span
                  className={`mt-2 text-sm font-semibold
                  ${isActive ? "text-pink-600" : "text-gray-800"}`}
                >
                  {item.name}
                </span>

                {/* Fixed underline space */}
                <div className="mt-2 h-[3px]">
                  {isActive && (
                    <span className="block w-10 h-[3px] bg-pink-600 rounded-full" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
    <VegetableProductCarousel/>
    </>
  );
}
