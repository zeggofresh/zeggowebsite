import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import AddButton from "../../custom/AddButton";

const categories = [
  { name: "Audio", icon: "🎧" },
  { name: "Laptops", icon: "💻" },
  { name: "Cameras", icon: "📷" },
  { name: "Tablets", icon: "📱" },
  { name: "Gadgets", icon: "⏱️" },
];

const products = [
  {
    id: 1,
    name: "Wireless Earbuds",
    img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df",
    price: 1999,
    oldPrice: 3999,
    off: "₹2000 OFF",
    qty: "1 pair",
    tag: "Trending",
  },
  {
    id: 2,
    name: "Laptop Stand",
    img: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46",
    price: 899,
    oldPrice: 1499,
    off: "₹600 OFF",
    qty: "1 piece",
    tag: "Utility",
  },
  {
    id: 3,
    name: "Action Camera",
    img: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
    price: 4999,
    oldPrice: 7999,
    off: "₹3000 OFF",
    qty: "1 piece",
    tag: "Bestseller",
  },
  {
    id: 4,
    name: "Tablet Cover",
    img: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0",
    price: 599,
    oldPrice: 999,
    off: "₹400 OFF",
    qty: "1 piece",
    tag: "Protection",
  },
  {
    id: 5,
    name: "Smart Watch",
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    price: 2999,
    oldPrice: 4999,
    off: "₹2000 OFF",
    qty: "1 piece",
    tag: "Smart",
  },
  {
    id: 6,
    name: "USB Hub",
    img: "https://images.unsplash.com/photo-1625948515291-69613efd103f",
    price: 799,
    oldPrice: 1299,
    off: "₹500 OFF",
    qty: "1 piece",
    tag: "Essential",
  },
];

export default function Electronics() {
  const [active, setActive] = useState("Audio");
  const { addItem, updateQuantity, getCartItem } = useCart();
  const navigate = useNavigate();

  return (
    <>
      <div className="w-full bg-white border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-8 overflow-x-auto scrollbar-hide py-5 justify-start md:justify-center">
            {categories.map((item) => {
              const isActive = active === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => setActive(item.name)}
                  className="flex flex-col items-center min-w-[96px] focus:outline-none"
                >
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold transition-all duration-300 ${
                      isActive
                        ? "bg-pink-100 text-pink-600 scale-105 shadow-sm"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {item.icon}
                  </div>
                  <span className={`mt-2 text-sm font-semibold ${isActive ? "text-pink-600" : "text-gray-800"}`}>
                    {item.name}
                  </span>
                  <div className="mt-2 h-[3px]">
                    {isActive && <span className="block w-10 h-[3px] bg-pink-600 rounded-full" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="w-full bg-gray-50 py-5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {products.map((item) => {
              const uniqueId = `${item.name}${item.price}`;
              return (
                <div key={uniqueId} className="w-[160px] bg-white rounded-xl overflow-hidden">
                  <div className="relative cursor-pointer" onClick={() => navigate(`/product/electronics-${item.id}`)}>
                    <img src={item.img} alt={item.name} className="w-full h-32 object-cover" />
                    <AddButton
                      item={{ ...item, id: uniqueId }}
                      cartItem={getCartItem(uniqueId)}
                      onAddToCart={(item) => addItem(item)}
                      onQuantityChange={(item, qty) => updateQuantity(uniqueId, qty)}
                      containerClass="absolute bottom-2 right-2 flex items-center border border-pink-600 rounded-full overflow-hidden"
                      buttonClass="px-3 py-1 bg-pink-600 text-white font-bold text-sm"
                      minusButtonClass="px-3 py-1 bg-white text-pink-600 font-bold text-sm"
                      plusButtonClass="px-3 py-1 bg-pink-600 text-white font-bold text-sm"
                    />
                  </div>
                  <div className="p-2">
                    <div className="flex items-center gap-1 mb-1">
                      <span className="bg-green-700 text-white font-bold text-xs px-1.5 py-0.5 rounded">
                        ₹{item.price}
                      </span>
                      <span className="line-through text-gray-400 text-[11px]">₹{item.oldPrice}</span>
                    </div>
                    <p className="text-green-700 text-[11px] font-semibold mb-1">{item.off}</p>
                    <h3 className="font-semibold text-sm text-gray-900 line-clamp-1">{item.name}</h3>
                    <p className="text-xs text-gray-500 mb-1">{item.qty}</p>
                    <span className="inline-block bg-green-50 text-green-700 text-[11px] px-2 py-0.5 rounded font-medium">
                      {item.tag}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
