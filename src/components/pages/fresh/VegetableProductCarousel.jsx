import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import AddButton from "../../custom/AddButton";

const products = [
  {
    id: 1,
    name: "Onion",
    img: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb",
    price: 28,
    oldPrice: 65,
    off: "₹37 OFF",
    qty: "1 Pack (900–1000 g)",
    tag: "Fresh",
    veg: true,
  },
  {
    id: 2,
    name: "Potato",
    img: "https://images.unsplash.com/photo-1582515073490-dc84f7c9b5b2",
    price: 20,
    oldPrice: 34,
    off: "₹14 OFF",
    qty: "450–500 g",
    tag: "Daily Needs",
    veg: true,
  },
  {
    id: 3,
    name: "Broccoli",
    img: "https://images.unsplash.com/photo-1584270354949-1c9c3b8c8e82",
    price: 29,
    oldPrice: 47,
    off: "₹18 OFF",
    qty: "1 pc",
    tag: "Healthy",
    veg: true,
  },
  {
    id: 4,
    name: "Capsicum",
    img: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2",
    price: 53,
    oldPrice: 81,
    off: "₹28 OFF",
    qty: "2 pcs",
    tag: "Fresh Pick",
    veg: true,
  },
  {
    id: 5,
    name: "Organically Grown Potato",
    img: "https://images.unsplash.com/photo-1604908177522-0403f09ec1e2",
    price: 25,
    oldPrice: 38,
    off: "₹13 OFF",
    qty: "500 g",
    tag: "Organic",
    veg: true,
  },
  {
    id: 6,
    name: "Lady Finger",
    img: "https://images.unsplash.com/photo-1626776873375-57f3b8e6cda2",
    price: 24,
    oldPrice: 49,
    off: "₹25 OFF",
    qty: "250 g",
    tag: "Farm Fresh",
    veg: true,
  },
];

const VegetableProductCarousel = () => {
  const { addItem, updateQuantity, getCartItem } = useCart();
  const navigate = useNavigate();

  return (
    <div className="w-full bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-4">
          {products.map((item) => {
            const uniqueId = `${item.name}${item.price}`;

            return (
              <div
                key={uniqueId}
                className="w-[160px] bg-white rounded-xl overflow-hidden"
              >
                {/* Image */}
                <div className="relative cursor-pointer" onClick={() => navigate(`/product/fresh-${item.id}`)}>
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-32 object-cover"
                  />

                  {/* Veg Icon */}
                  <div className="absolute top-2 left-2 bg-white w-4 h-4 rounded flex items-center justify-center border border-green-600">
                    <div className="w-2 h-2 rounded-full bg-green-600" />
                  </div>

                  {/* Add Button */}
                  <AddButton
                    item={{ ...item, id: uniqueId }}
                    cartItem={getCartItem(uniqueId)}
                    onAddToCart={(item) => addItem(item)}
                    onQuantityChange={(item, qty) =>
                      updateQuantity(uniqueId, qty)
                    }
                    containerClass="absolute bottom-2 right-2 flex items-center border border-pink-600 rounded-full overflow-hidden"
                    buttonClass="px-3 py-1 bg-pink-600 text-white font-bold text-sm"
                    minusButtonClass="px-3 py-1 bg-white text-pink-600 font-bold text-sm"
                    plusButtonClass="px-3 py-1 bg-pink-600 text-white font-bold text-sm"
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
  );
};

export default VegetableProductCarousel;
