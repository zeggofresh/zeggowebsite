import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import AddButton from "../../custom/AddButton";

const products = [
  {
    id: "vietnamese-coffee",
    name: "Vietnamese Cold Coffee",
    img: "https://images.unsplash.com/photo-1521305916504-4a1121188589",
    price: 113,
    oldPrice: 229,
    off: "₹116 OFF",
    qty: "410 ml",
    tag: "Freshly Brewed",
    veg: true,
  },
  {
    id: "tiramisu",
    name: "Tiramisu",
    img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
    price: 71,
    oldPrice: 139,
    off: "₹68 OFF",
    qty: "1 Piece",
    tag: "Rich Espresso",
    veg: true,
  },
  {
    id: "chilli-cheese-toast",
    name: "Chilli Cheese Toast",
    img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
    price: 75,
    oldPrice: 149,
    off: "₹74 OFF",
    qty: "135 g",
    tag: "Cheesy Crunch",
    veg: true,
  },
  {
    id: "aloo-pyaz-kulcha",
    name: "Aloo Pyaz Kulcha",
    img: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
    price: 81,
    oldPrice: 159,
    off: "₹78 OFF",
    qty: "2 Kulchas",
    veg: true,
  },
   {
    id: "cappuccino",
    name: "Cappuccino",
    img: "https://images.unsplash.com/photo-1447933601403-0c6688de566e",
    price: 85,
    oldPrice: 120,
    off: "₹35 OFF",
    qty: "250 ml",
    tag: "Freshly Brewed",
    veg: true,
  },
  {
    id: "croissant",
    name: "Croissant",
    img: "https://images.unsplash.com/photo-1509440159596-0249088772ff",
    price: 65,
    oldPrice: 99,
    off: "₹34 OFF",
    qty: "1 Piece",
    tag: "Buttery Flaky",
    veg: true,
  },
];

const CafeProductCarousel = () => {
  const { addItem, updateQuantity, getCartItem } = useCart();
  const navigate = useNavigate();
  return (
    <div className="w-full bg-gray-50 py-5">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="flex flex-wrap justify-center gap-4">
          {products.map((item) => (
            <div
              key={`${item.name}${item.price}`}
              className="w-[160px] bg-white rounded-xl overflow-hidden"
            >
              {/* Image */}
              <div className="relative cursor-pointer" onClick={() => navigate(`/product/${item.id}`)}>
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-32 object-cover"
                />

                {item.veg && (
                  <div className="absolute top-2 left-2 bg-white w-4 h-4 rounded flex items-center justify-center border border-green-600">
                    <div className="w-2 h-2 rounded-full bg-green-600" />
                  </div>
                )}

                <AddButton
                  item={{...item, id: `${item.name}${item.price}`}}
                  cartItem={getCartItem(`${item.name}${item.price}`)}
                  onAddToCart={(item) => addItem(item)}
                  onQuantityChange={(item, newQuantity) => updateQuantity(`${item.name}${item.price}`, newQuantity)}
                  containerClass="absolute bottom-2 right-2 flex items-center border border-pink-600 rounded-full overflow-hidden"
                  buttonClass="px-3 py-1 bg-pink-600 text-white font-bold text-sm hover:bg-pink-700"
                  minusButtonClass="px-3 py-1 bg-white text-pink-600 font-bold text-sm hover:bg-pink-50"
                  plusButtonClass="px-3 py-1 bg-pink-600 text-white font-bold text-sm hover:bg-pink-700"
                />
              </div>

              {/* Content */}
              <div className="p-2">
                <div className="flex items-center gap-1 mb-1">
                  <span className="bg-green-700 text-white font-bold text-xs px-1.5 py-0.5 rounded">
                    ₹{item.price}
                  </span>
                  <span className="line-through text-gray-400 text-[11px]">
                    ₹{item.oldPrice}
                  </span>
                </div>

                <p className="text-green-700 text-[11px] font-semibold mb-1">
                  {item.off}
                </p>

                <h3 className="font-semibold text-sm text-gray-900 line-clamp-1">
                  {item.name}
                </h3>

                <p className="text-xs text-gray-500 mb-1">{item.qty}</p>

                {item.tag && (
                  <span className="inline-block bg-teal-50 text-teal-700 text-[11px] px-2 py-0.5 rounded font-medium">
                    {item.tag}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default CafeProductCarousel;
