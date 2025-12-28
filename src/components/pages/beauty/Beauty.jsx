import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import AddButton from "../../custom/AddButton";

const categories = [
  { name: "Skincare", icon: "🧔" },
  { name: "Haircare", icon: "💇" },
  { name: "Makeup", icon: "💄" },
  { name: "Fragrance", icon: "🌸" },
  { name: "Wellness", icon: "✨" },
];

const products = [
  {
    id: 1,
    name: "Face Cream",
    img: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571",
    price: 599,
    oldPrice: 999,
    off: "₹400 OFF",
    qty: "50g",
    tag: "Hydrating",
  },
  {
    id: 2,
    name: "Shampoo",
    img: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388",
    price: 399,
    oldPrice: 699,
    off: "₹300 OFF",
    qty: "200ml",
    tag: "Natural",
  },
  {
    id: 3,
    name: "Lipstick",
    img: "https://images.unsplash.com/photo-1586495777744-4413f21062fa",
    price: 499,
    oldPrice: 799,
    off: "₹300 OFF",
    qty: "1 piece",
    tag: "Matte",
  },
  {
    id: 4,
    name: "Perfume",
    img: "https://images.unsplash.com/photo-1541643600914-78b084683601",
    price: 1299,
    oldPrice: 1999,
    off: "₹700 OFF",
    qty: "50ml",
    tag: "Long Lasting",
  },
  {
    id: 5,
    name: "Face Mask",
    img: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b",
    price: 299,
    oldPrice: 499,
    off: "₹200 OFF",
    qty: "1 piece",
    tag: "Glow",
  },
  {
    id: 6,
    name: "Nail Polish",
    img: "https://images.unsplash.com/photo-1519699047748-de8e457a634e",
    price: 199,
    oldPrice: 349,
    off: "₹150 OFF",
    qty: "1 bottle",
    tag: "Trendy",
  },
];

export default function Beauty() {
  const [active, setActive] = useState("Skincare");
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
                  <div className="relative cursor-pointer" onClick={() => navigate(`/product/beauty-${item.id}`)}>
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
