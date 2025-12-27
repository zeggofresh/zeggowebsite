import React from "react";
import { Plus } from "lucide-react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../context/CartContext";

const products = [
  {
    id: "rin-powder",
    name: "Rin Detergent Powder",
    price: 200,
    discount: 0,
    pack: "1 pack (2 kg)",
    features: ["Quick Dissolve"],
    rating: 4.8,
    reviews: 909,
    img: "/images/rin.png",
  },
  {
    id: "ariel-matic",
    name: "Ariel Matic Top Load Detergent Powder | For Washing...",
    price: 420,
    original: 595,
    pack: "1 pack (2 kg)",
    features: ["Stain Removal"],
    rating: 4.7,
    reviews: 3500,
    img: "/images/ariel.png",
  },
  {
    id: "mr-white",
    name: "Mr. White Front & Top Load Detergent Liquid",
    price: 159,
    original: 189,
    pack: "1 pack (2 L)",
    features: ["Super Saver Pack"],
    rating: 4.7,
    reviews: 909,
    img: "/images/mrwhite.png",
  },
  {
    id: "ariel-matic-2",
    name: "Ariel Matic Detergent Powder Front Load Liquid free|Washing...",
    price: 938,
    original: 1250,
    pack: "1 pc (6.3 L)",
    features: ["For Tough Stains"],
    rating: 4.2,
    reviews: 103,
    img: "/images/ariel2.png",
  },
  {
    id: "rin-matic",
    name: "Rin Matic Top Load Detergent Liquid | Pouch",
    price: 194,
    original: 249,
    pack: "1 pack (2 L)",
    features: ["Fresh & Fragrant"],
    rating: 4.9,
    reviews: 26200,
    img: "/images/rin2.png",
  },
  {
    id: "ariel-power-gel",
    name: "Ariel Power Gel Liquid Detergent for Top load washing machine",
    price: 271,
    original: 335,
    pack: "1 pack (2 kg)",
    rating: 4.6,
    reviews: 138,
    img: "/images/ariel3.png",
  },
  {
    id: "beco-front-load",
    name: "Beco Front Load Laundry Detergent Liquid",
    price: 158,
    original: 250,
    pack: "960ml",
    features: ["Lavender"],
    rating: 4.5,
    reviews: 1900,
    img: "/images/beco.png",
  },
  {
    id: "surf-excel",
    name: "Surf Excel Matic Top Load Detergent Liquid | Pouch",
    price: 569,
    original: 740,
    pack: "1 pack (5 L)",
    features: ["Stain Removal"],
    rating: 4.9,
    reviews: 5200,
    img: "/images/surf.png",
  },
];

export default function HouseholdCleaning() {
  const { addItem, updateQuantity, getCartItem } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    addItem(product);
  };

  const handleQuantityChange = (product, newQuantity) => {
    const productId = product.name + product.price;
    updateQuantity(productId, newQuantity);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 font-inter">
       <div className="flex justify-between items-center mb-4">
             <h2 className="text-2xl font-bold text-gray-900">Household Cleaning</h2>
             <button className="text-pink-600 font-semibold hover:text-pink-700 flex items-center gap-1">
               See All <FaArrowRight className="text-lg" />
             </button>
           </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
        {products.map((product, index) => {
          const productId = product.name + product.price;
          const cartItem = getCartItem(productId);
          
          return (
          <div
            key={index}
            className="bg-white p-3 flex flex-col"
          >
            <div className="relative mb-3 flex items-center justify-center h-32 bg-white border border-gray-300 rounded-lg cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
              <img
                src={product.img}
                alt={product.name}
                className="h-full w-full object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = '<div class="text-gray-300 text-xs">Image</div>';
                }}
              />
            </div>

            {cartItem ? (
              <div className="self-end mb-2 flex items-center border border-pink-600 rounded-full overflow-hidden">
                <button 
                  onClick={() => handleQuantityChange(product, cartItem.quantity - 1)}
                  className="px-3 py-1 bg-white text-pink-600 font-bold text-sm hover:bg-pink-50"
                >
                  -
                </button>
                <span className="px-2 text-pink-600 font-bold">{cartItem.quantity}</span>
                <button 
                  onClick={() => handleQuantityChange(product, cartItem.quantity + 1)}
                  className="px-3 py-1 bg-pink-600 text-white font-bold text-sm hover:bg-pink-700"
                >
                  +
                </button>
              </div>
            ) : (
              <div className="self-end mb-2 flex items-center border border-pink-600 rounded-full overflow-hidden">
                <button 
                  onClick={() => handleAddToCart(product)}
                  className="px-3 py-1 bg-pink-600 text-white font-bold text-sm hover:bg-pink-700"
                >
                  ADD
                </button>
              </div>
            )}

            <div className="mb-2">
              <span className="inline-block bg-green-700 text-white text-base font-bold px-2 py-1 rounded">
                ₹{product.price}
              </span>
              {product.original && (
                <>
                  <span className="ml-2 line-through text-gray-500 text-sm">
                    ₹{product.original}
                  </span>
                </>
              )}
            </div>

            {product.original && (
              <div className="mb-2">
                <span className="inline-block bg-green-700 text-white text-xs font-semibold px-2 py-0.5 rounded">
                  ₹{product.original - product.price} OFF
                </span>
              </div>
            )}

            <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2">
              {product.name}
            </h3>

            <p className="text-xs text-gray-600 mb-1">{product.pack}</p>

            {product.features && (
              <div className="mb-2">
                <span className="inline-block text-xs font-medium text-teal-700 bg-white">
                  {product.features[0]}
                </span>
              </div>
            )}

            <div className="flex items-center gap-1 text-xs text-green-700">
              <span>★</span>
              <span className="font-semibold">{product.rating}</span>
              <span>({product.reviews > 1000 ? `${(product.reviews / 1000).toFixed(1)}k` : product.reviews})</span>
            </div>
          </div>
          )})}
      </div>
    </div>
  );
}