import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { HiArrowLeft } from "react-icons/hi";
import { FaWallet, FaCreditCard, FaUniversity, FaMobileAlt } from "react-icons/fa";

const Cart = ({ onClose }) => {
  const { items, updateQuantity, removeItem } = useCart();
  const navigate = useNavigate();
  const [showPayment, setShowPayment] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [showTracking, setShowTracking] = useState(false);
  const [showCardForm, setShowCardForm] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: ""
  });
  const paymentRef = useRef(null);

  // Auto scroll to payment section when it appears
  useEffect(() => {
    if (showPayment && paymentRef.current) {
      setTimeout(() => {
        paymentRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [showPayment]);

  const handlePayment = () => {
    if (selectedPayment) {
      setOrderPlaced(true);
      // Navigate to tracking page after 3 seconds
      setTimeout(() => {
        items.forEach(item => {
          const id = item.name + item.price;
          removeItem(id);
        });
        setOrderPlaced(false);
        onClose();
        navigate("/order-tracking");
      }, 3000);
    }
  };

  const handleQuantityChange = (itemId, qty) => {
    if (qty <= 0) removeItem(itemId);
    else updateQuantity(itemId, qty);
  };

  const subtotal = items.reduce((sum, item) => {
    const price = item.original ?? item.price;
    return sum + price * item.quantity;
  }, 0);

  const savings = items.reduce((sum, item) => {
    if (item.original) {
      return sum + (item.original - item.price) * item.quantity;
    }
    return sum;
  }, 0);

  return (
    <div className="h-full flex flex-col bg-gray-50" style={{scrollBehavior: "smooth"}}>
      {/* Header - Fixed at top */}
      <div className="bg-white px-4 py-3 flex items-center gap-3 shadow-md border-b">
        <HiArrowLeft className="text-xl cursor-pointer" onClick={onClose} />
        <h1 className="text-lg font-semibold">{showPayment ? "Payment" : "Cart"}</h1>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto bg-gray-100">
        <div className="w-full max-w-md md:max-w-2xl lg:max-w-3xl mx-auto bg-gray-50">

        {/* Order Success Message */}
        {orderPlaced && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 mx-4 max-w-sm text-center">
              <div className="text-6xl mb-4">✅</div>
              <h2 className="text-2xl font-bold text-black mb-2">Order Placed!</h2>
              <p className="text-gray-600 mb-4">Your order has been successfully placed</p>
              <div className="text-sm text-gray-500">
                Payment Method: <span className="font-semibold text-black">
                  {selectedPayment === "upi" && "UPI/QR"}
                  {selectedPayment === "card" && "Card"}
                  {selectedPayment === "netbanking" && "Net Banking"}
                  {selectedPayment === "wallet" && "Wallet"}
                  {selectedPayment === "cod" && "Cash on Delivery"}
                </span>
              </div>
              <div className="text-lg font-bold text-green-600 mt-2">
                Total: ₹{subtotal}
              </div>
            </div>
          </div>
        )}

        {/* Empty Cart */}
        {items.length === 0 ? (
          <div className="p-10 text-center">
            <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-500">Add some items to get started</p>
          </div>
        ) : (
          <>
            {/* Savings */}
            {savings > 0 && (
              <div className="bg-green-100 text-green-700 text-sm px-4 py-2">
                🎉 Yay! You saved ₹{savings}
              </div>
            )}

            {/* No Fee Card */}
            <div className="bg-white m-4 p-4 rounded-xl shadow">
              <div className="flex gap-4">
                <div className="text-purple-600 text-4xl font-bold">₹0</div>
                <div>
                  <h2 className="font-semibold">NO FEES</h2>
                  <ul className="text-xs text-gray-600 mt-1 space-y-1">
                    <li>✔ ₹0 Handling Fee</li>
                    <li>✔ ₹0 Surge Fee</li>
                    <li>✔ Free Delivery above ₹99</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Cart Items */}
            <div className="bg-white mx-4 rounded-xl p-4 shadow">
              <p className="font-medium mb-2">⚡ Delivery in 5 mins</p>

              {items.map((item) => {
                const id = item.name + item.price;
                const price = item.original ?? item.price;

                return (
                  <div key={id} className="flex gap-4 py-4 border-b last:border-0">
                    <img
                      src={item.img || "https://via.placeholder.com/80"}
                      alt={item.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />

                    <div className="flex-1">
                      <h3 className="text-sm font-semibold">{item.name}</h3>
                      <p className="text-xs text-gray-500">{item.pack}</p>

                      <div className="flex items-center justify-between mt-3">
                        {/* Quantity */}
                        <div className="flex items-center border rounded-lg overflow-hidden">
                          <button
                            className="px-3 py-1"
                            onClick={() => handleQuantityChange(id, item.quantity - 1)}
                          >
                            −
                          </button>
                          <span className="px-3 text-sm">{item.quantity}</span>
                          <button
                            className="px-3 py-1"
                            onClick={() => handleQuantityChange(id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="font-semibold">
                            ₹{price * item.quantity}
                          </p>
                          {item.original && (
                            <p className="text-xs text-gray-400 line-through">
                              ₹{item.original * item.quantity}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Add More */}
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-600">Missed something?</span>
                <button className="bg-black text-white px-4 py-2 rounded-lg text-sm">
                  + Add More Items
                </button>
              </div>
            </div>

            {/* Coupons */}
            <div className="bg-white mx-4 mt-4 p-4 rounded-xl shadow flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">
                  🎟 Unlocked <span className="text-purple-600">16 coupons</span>
                </p>
                <p className="text-xs text-gray-500">Explore now</p>
              </div>
              <span className="text-xl">›</span>
            </div>

            {/* Bill Summary */}
            <div className="bg-white mx-4 mt-4 p-4 rounded-xl shadow">
              <p className="font-medium mb-2">🧾 Bill Summary</p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>₹0</span>
                </div>
                <div className="flex justify-between font-semibold border-t pt-2">
                  <span>Total</span>
                  <span>₹{subtotal}</span>
                </div>
              </div>
            </div>

            {/* Payment Section */}
            {showPayment && (
              <div ref={paymentRef} className="bg-white mx-4 mt-4 p-4 rounded-xl shadow">
                <p className="font-semibold text-lg mb-4">💳 Payment Method</p>
                
                <div className="space-y-3">
                  {/* UPI */}
                  <div
                    onClick={() => setSelectedPayment("upi")}
                    className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      selectedPayment === "upi" ? "border-pink-600 bg-pink-50" : "border-gray-200"
                    }`}
                  >
                    <FaMobileAlt className="text-2xl text-purple-600" />
                    <div className="flex-1">
                      <p className="font-semibold text-black">UPI / QR</p>
                      <p className="text-xs text-gray-500">PhonePe, Paytm, Google Pay</p>
                    </div>
                    {selectedPayment === "upi" && <span className="text-pink-600 font-bold">✓</span>}
                  </div>

                  {/* Cards */}
                  <div
                    onClick={() => {
                      setSelectedPayment("card");
                      setShowCardForm(true);
                    }}
                    className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      selectedPayment === "card" ? "border-pink-600 bg-pink-50" : "border-gray-200"
                    }`}
                  >
                    <FaCreditCard className="text-2xl text-blue-600" />
                    <div className="flex-1">
                      <p className="font-semibold text-black">Credit / Debit Card</p>
                      <p className="text-xs text-gray-500">Visa, MasterCard, Rupay</p>
                    </div>
                    {selectedPayment === "card" && <span className="text-pink-600 font-bold">✓</span>}
                  </div>

                  {/* Card Details Form */}
                  {showCardForm && selectedPayment === "card" && (
                    <div className="bg-gray-50 p-4 rounded-xl border-2 border-blue-200">
                      <p className="font-semibold text-black mb-3">Enter Card Details</p>
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="Card Number"
                          maxLength="19"
                          value={cardDetails.cardNumber}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
                            setCardDetails({...cardDetails, cardNumber: value});
                          }}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                          type="text"
                          placeholder="Cardholder Name"
                          value={cardDetails.cardName}
                          onChange={(e) => setCardDetails({...cardDetails, cardName: e.target.value.toUpperCase()})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="flex gap-3">
                          <input
                            type="text"
                            placeholder="MM/YY"
                            maxLength="5"
                            value={cardDetails.expiryDate}
                            onChange={(e) => {
                              let value = e.target.value.replace(/\D/g, '');
                              if (value.length >= 2) {
                                value = value.slice(0, 2) + '/' + value.slice(2, 4);
                              }
                              setCardDetails({...cardDetails, expiryDate: value});
                            }}
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <input
                            type="text"
                            placeholder="CVV"
                            maxLength="3"
                            value={cardDetails.cvv}
                            onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value.replace(/\D/g, '')})}
                            className="w-24 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Cash on Delivery */}
                  <div
                    onClick={() => setSelectedPayment("cod")}
                    className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      selectedPayment === "cod" ? "border-pink-600 bg-pink-50" : "border-gray-200"
                    }`}
                  >
                    <span className="text-2xl">💵</span>
                    <div className="flex-1">
                      <p className="font-semibold text-black">Cash on Delivery</p>
                      <p className="text-xs text-gray-500">Pay when you receive</p>
                    </div>
                    {selectedPayment === "cod" && <span className="text-pink-600 font-bold">✓</span>}
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        </div>
      </div>

      {/* Bottom Button - Fixed at bottom */}
      {items.length > 0 && (
        <div className="bg-white border-t p-4 shadow-lg">
          {!showPayment ? (
            <button 
              onClick={() => setShowPayment(true)}
              className="w-full bg-pink-500 text-white py-3 rounded-xl text-lg font-semibold"
            >
              Add Address to Proceed
            </button>
          ) : (
            <button 
              disabled={!selectedPayment}
              onClick={handlePayment}
              className={`w-full py-3 rounded-xl text-lg font-semibold transition-colors ${
                selectedPayment 
                  ? "bg-green-600 text-white" 
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {selectedPayment ? `Pay ₹${subtotal}` : "Select Payment Method"}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
