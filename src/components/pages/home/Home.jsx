import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import AddButton from "../../custom/AddButton";
import SEO from "../../custom/SEO";

const categories = [
  { name: "Furniture", icon: "🛋️" },
  { name: "Kitchen", icon: "🍳" },
  { name: "Bedroom", icon: "🛏️" },
  { name: "Decor", icon: "🏠" },
  { name: "Storage", icon: "📦" },
];

const products = [
  {
    id: 1,
    name: "Wooden Chair",
    img: "https://images.unsplash.com/photo-1506326426992-32b61d62d977",
    price: 1299,
    oldPrice: 2499,
    off: "₹1200 OFF",
    qty: "1 piece",
    tag: "Bestseller",
  },
  {
    id: 2,
    name: "Table Lamp",
    img: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15",
    price: 599,
    oldPrice: 999,
    off: "₹400 OFF",
    qty: "1 piece",
    tag: "Trending",
  },
  {
    id: 3,
    name: "Cushion Cover",
    img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
    price: 199,
    oldPrice: 399,
    off: "₹200 OFF",
    qty: "1 piece",
    tag: "New",
  },
  {
    id: 4,
    name: "Wall Clock",
    img: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c",
    price: 899,
    oldPrice: 1499,
    off: "₹600 OFF",
    qty: "1 piece",
    tag: "Popular",
  },
  {
    id: 5,
    name: "Bedsheet Set",
    img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    price: 799,
    oldPrice: 1299,
    off: "₹500 OFF",
    qty: "1 set",
    tag: "Combo",
  },
  {
    id: 6,
    name: "Storage Box",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64",
    price: 399,
    oldPrice: 699,
    off: "₹300 OFF",
    qty: "1 piece",
    tag: "Utility",
  },
];

export default function Home() {
  const [active, setActive] = useState("Furniture");
  const { addItem, updateQuantity, getCartItem } = useCart();
  const navigate = useNavigate();

  return (
    <>
      <SEO 
        title="Home - Zeggo | Online Grocery Shopping for Furniture, Kitchen, Bedroom & More"
        description="Shop for home furniture, kitchen items, bedroom essentials, decor and storage solutions at Zeggo. Best prices and fast delivery."
        keywords="home furniture, kitchen items, bedroom essentials, home decor, storage solutions, online shopping"
      />
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
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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
                <article key={uniqueId} className="w-[160px] bg-white rounded-xl overflow-hidden">
                  <div className="relative cursor-pointer" onClick={() => navigate(`/product/home-${item.id}`)}>
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
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
