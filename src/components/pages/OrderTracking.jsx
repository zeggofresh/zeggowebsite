import React from "react";
import { useNavigate } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";
import { FaMapMarkerAlt, FaMotorcycle, FaUser, FaStar, FaPhone, FaCheck, FaUtensils, FaGift } from "react-icons/fa";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Custom Delivery Marker
const deliveryIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/61/61231.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

export default function OrderTracking() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-3 shadow-md border-b fixed top-[70px] left-0 right-0 z-40">
        <div className="flex items-center justify-center relative">
          <HiArrowLeft 
            className="text-xl ml-9 cursor-pointer absolute left-0" 
            onClick={() => navigate("/")} 
          />
          <h1 className="text-lg font-semibold">Track Order</h1>
        </div>
      </div>

      {/* Content */}
      <div className="pt-[80px]">
        <div className="w-full max-w-md md:max-w-2xl lg:max-w-3xl mx-auto p-4">

          {/* Map Section */}
          <div className="bg-white rounded-xl overflow-hidden shadow-lg mb-4">
            <MapContainer center={[28.6139, 77.209]} zoom={13} scrollWheelZoom={false} className="h-64 w-full">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[28.6139, 77.209]} icon={deliveryIcon}>
                <Popup>Delivery Partner is here!</Popup>
              </Marker>
            </MapContainer>
          </div>

          {/* Delivery Boy Info */}
          <div className="bg-white rounded-xl p-4 shadow-lg mb-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center text-3xl">
                <FaUser className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-black text-lg">Rahul Kumar</h3>
                <p className="text-sm text-gray-500">Delivery Partner</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-yellow-500">
                    <FaStar className="inline text-yellow-500" />
                  </span>
                  <span className="text-sm font-semibold text-black">4.8</span>
                  <span className="text-xs text-gray-500">(250+ orders)</span>
                </div>
              </div>
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-lg text-lg">
                <FaPhone className="text-base" />
                Call
              </button>
            </div>
          </div>

          {/* Order Status Timeline */}
          <div className="bg-white rounded-xl p-4 shadow-lg mb-4">
            <h3 className="font-bold text-black text-lg mb-4">🕒 Order Status</h3>
            <div className="space-y-4">
              {/* Order Placed */}
              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                    <FaCheck className="text-sm" />
                  </div>
                  <div className="w-0.5 h-12 bg-green-600"></div>
                </div>
                <div className="flex-1 pb-4">
                  <p className="font-semibold text-black">Order Placed</p>
                  <p className="text-xs text-gray-500">Just now</p>
                </div>
              </div>

              {/* Preparing */}
              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white animate-pulse">
                    <FaUtensils className="text-sm" />
                  </div>
                  <div className="w-0.5 h-12 bg-gray-300"></div>
                </div>
                <div className="flex-1 pb-4">
                  <p className="font-semibold text-black">Preparing your order</p>
                  <p className="text-xs text-green-600">In progress...</p>
                </div>
              </div>

              {/* Out for Delivery */}
              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <FaMotorcycle className="text-sm" />
                  </div>
                  <div className="w-0.5 h-12 bg-gray-300"></div>
                </div>
                <div className="flex-1 pb-4">
                  <p className="font-semibold text-gray-400">Out for delivery</p>
                  <p className="text-xs text-gray-400">Pending</p>
                </div>
              </div>

              {/* Delivered */}
              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <FaGift className="text-sm" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-400">Delivered</p>
                  <p className="text-xs text-gray-400">Pending</p>
                </div>
              </div>
            </div>
          </div>

          {/* Estimated Time */}
<div className="bg-white rounded-xl p-4 shadow-md mt-4 border border-green-100">
  <div className="flex items-center justify-between">
    <div>
      <p className="text-xs text-gray-500 uppercase tracking-wide">
        Estimated Delivery
      </p>
      <p className="text-lg font-semibold text-gray-900">
        Arriving Soon
      </p>
    </div>

    <div className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow">
      ⚡ 12 min
    </div>
  </div>
</div>


        </div>
      </div>
    </div>
  );
}
