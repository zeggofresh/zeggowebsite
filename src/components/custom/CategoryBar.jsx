import {
  ShoppingBag,
  Coffee,
  Home,
  Puzzle,
  Apple,
  Headphones,
  Smartphone,
  Sparkles,
  Shirt,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function CategoryBar() {
  const location = useLocation();

  const categories = [
    { name: "All", path: "/", icon: ShoppingBag },
    { name: "Cafe", path: "/cafe", icon: Coffee },
    { name: "Home", path: "/home", icon: Home },
    { name: "Toys", path: "/toys", icon: Puzzle },
    { name: "Fresh", path: "/fresh", icon: Apple },
    { name: "Electronics", path: "/electronics", icon: Headphones },
    { name: "Mobiles", path: "/mobiles", icon: Smartphone },
    { name: "Beauty", path: "/beauty", icon: Sparkles },
    { name: "Fashion", path: "/fashion", icon: Shirt },
  ];

  const isActive = (path) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(path);

  return (
    <div className="w-full bg-white border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-6 overflow-x-auto scrollbar-hide h-[66px]">

          {categories.map((cat, index) => {
            const Icon = cat.icon;
            const active = isActive(cat.path);

            return (
              <Link
                key={index}
                to={cat.path}
                className="relative flex flex-col items-center justify-center group"
              >
                {/* ICON + TEXT */}
                <span
                  className={`flex items-center gap-2 px-2 py-1 rounded-lg
                  transition-all duration-300 ease-out
                  ${
                    active
                      ? "text-purple-600"
                      : "text-gray-600 group-hover:text-purple-600 group-hover:bg-purple-50"
                  }`}
                >
                  <Icon
                    size={22}
                    strokeWidth={1.8}
                    className="shrink-0"
                  />

                  <span className="text-[14px] font-semibold whitespace-nowrap">
                    {cat.name}
                  </span>
                </span>

                {/* UNDERLINE */}
                <span
                  className={`mt-2 h-[3px] rounded-full bg-purple-600
                  transition-all duration-300 ease-out
                  ${
                    active ? "w-full opacity-100" : "w-0 opacity-0"
                  }`}
                />
              </Link>
            );
          })}

        </div>
      </div>
    </div>
  );
}
