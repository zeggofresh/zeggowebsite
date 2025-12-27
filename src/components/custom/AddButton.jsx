import React from "react";

const AddButton = ({ 
  item, 
  cartItem, 
  onAddToCart, 
  onQuantityChange, 
  buttonClass = "px-3 py-1 bg-pink-600 text-white font-bold text-sm hover:bg-pink-700",
  minusButtonClass = "px-3 py-1 bg-white text-pink-600 font-bold text-sm hover:bg-pink-50",
  plusButtonClass = "px-3 py-1 bg-pink-600 text-white font-bold text-sm hover:bg-pink-700",
  containerClass = "self-end mb-2 flex items-center border border-pink-600 rounded-full overflow-hidden"
}) => {
  return (
    <div className={containerClass}>
      {cartItem ? (
        <>
          <button 
            onClick={() => onQuantityChange(item, cartItem.quantity - 1)}
            className={minusButtonClass}
          >
            -
          </button>
          <span className="px-2 text-pink-600 font-bold">{cartItem.quantity}</span>
          <button 
            onClick={() => onQuantityChange(item, cartItem.quantity + 1)}
            className={plusButtonClass}
          >
            +
          </button>
        </>
      ) : (
        <button 
          onClick={() => onAddToCart(item)}
          className={buttonClass}
        >
          ADD
        </button>
      )}
    </div>
  );
};

export default AddButton;