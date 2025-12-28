import { FaSearch, FaShoppingCart, FaUserCircle, FaBars, FaMapMarkerAlt } from "react-icons/fa";
import { MdKeyboardArrowDown, MdClose } from "react-icons/md";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { allProducts } from "../../data/products";
import Login from "../pages/auth/Login";
import Cart from "../custom/Cart";

export default function Navbar() {
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState();
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [showLocationPrompt, setShowLocationPrompt] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const { cartCount } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = isCartOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isCartOpen]);

  // Check for saved location on component mount
  useEffect(() => {
    const savedLocation = localStorage.getItem('userLocation');
    if (savedLocation) {
      setUserLocation(savedLocation);
    } else {
      // Show location prompt if no saved location
      const hasSeenPrompt = localStorage.getItem('hasSeenLocationPrompt');
      if (!hasSeenPrompt) {
        setTimeout(() => {
          setShowLocationPrompt(true);
          localStorage.setItem('hasSeenLocationPrompt', 'true');
        }, 2000); // Show prompt after 2 seconds
      }
    }
  }, []);

  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          try {
            // Using a free reverse geocoding API (Nominatim)
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
            );
            const data = await response.json();
            
            // Extract the location name - try different address formats
            let locationName = '';
            if (data.display_name) {
              // Get the first part of the display name which typically contains the most relevant info
              const parts = data.display_name.split(',');
              locationName = parts.slice(0, 3).join(',').trim(); // Take first 3 parts
            } else {
              locationName = `Near Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`;
            }
            
            setUserLocation(locationName);
            localStorage.setItem('userLocation', locationName);
            setIsLocationModalOpen(false);
            setShowLocationPrompt(false);
          } catch (error) {
            console.error('Error getting location name:', error);
            // Fallback to coordinates if API fails
            const fallbackLocation = `Near Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`;
            setUserLocation(fallbackLocation);
            localStorage.setItem('userLocation', fallbackLocation);
            setIsLocationModalOpen(false);
            setShowLocationPrompt(false);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          // If geolocation fails, prompt for manual input
          setIsLocationModalOpen(true);
          setShowLocationPrompt(false);
        }
      );
    } else {
      // Geolocation not supported, prompt for manual input
      setIsLocationModalOpen(true);
      setShowLocationPrompt(false);
    }
  };

  const handleManualLocation = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const location = formData.get('location');
    if (location) {
      setUserLocation(location);
      localStorage.setItem('userLocation', location);
      setIsLocationModalOpen(false);
      setShowLocationPrompt(false);
    }
  };

  // Function to get location from coordinates
  const getLocationFromCoordinates = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
      );
      const data = await response.json();
      
      let locationName = '';
      if (data.display_name) {
        const parts = data.display_name.split(',');
        locationName = parts.slice(0, 3).join(',').trim();
      } else {
        locationName = `Near Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`;
      }
      
      return locationName;
    } catch (error) {
      console.error('Error getting location name:', error);
      return `Near Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`;
    }
  };

  const changeLocation = () => {
    setIsLocationModalOpen(true);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      setShowSearchDropdown(false);
      return;
    }
    const filtered = allProducts.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filtered);
    setShowSearchDropdown(true);
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
    setSearchQuery("");
    setSearchResults([]);
    setShowSearchDropdown(false);
  };

  return (
    <>
      {/* ===== Navbar ===== */}
      <header className="w-full border-b bg-white sticky top-0 z-40 font-['Nunito']">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-4">

          {/* Logo + Location */}
          <div className="flex items-center gap-3 min-w-fit">
            <h1 className="text-3xl sm:text-[36px] 3xl font-[Nunito] font-extrabold text-pink-600 tracking-tight cursor-pointer transition-colors">
              zeggo
            </h1>

            <div className="flex flex-col leading-tight">
              <span className="text-[13px] sm:text-[15px] font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                ⚡12 minutes
              </span>
              <button 
                className="flex items-center gap-1 text-[11px] sm:text-[13px] font-semibold text-gray-700 cursor-pointer group transition-all"
                onClick={changeLocation}
                title={userLocation || "Set Location"}
              >
                <FaMapMarkerAlt className="text-green-600" size={12} />
                <span className="max-w-[80px] sm:max-w-[150px] truncate">
                  {userLocation || "Set Location"}
                </span>
                <MdKeyboardArrowDown className="transition-transform" size={14} />
              </button>
            </div>
          </div>

          {/* Search - Desktop */}
          <div className="hidden md:flex flex-1">
            <div className="relative w-full">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder='Search for "amul butter"'
                className="w-full h-11 pl-11 pr-4 text-[15px] font-semibold
                           rounded-xl border border-gray-300
                           focus:outline-none focus:ring-1 focus:ring-purple-500"
              />

              {/* Search Results Dropdown */}
              {showSearchDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-96 overflow-y-auto z-50">
                  {searchResults.length > 0 ? (
                    searchResults.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => handleProductClick(product.id)}
                        className="flex items-center gap-3 p-3 cursor-pointer border-b last:border-b-0"
                      >
                        <img
                          src={product.img}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm text-black">{product.name}</h4>
                          <p className="text-xs text-gray-500">{product.pack}</p>
                          <p className="text-sm font-bold text-green-700">₹{product.price}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center">
                      <p className="text-black font-bold text-lg">😔 No Product Available</p>
                      <p className="text-gray-500 text-sm mt-1">Try searching with different keywords</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Buttons - Desktop */}
          <div className="hidden md:flex items-center gap-8 min-w-fit">
            <button
              onClick={() => setIsLoginPopupOpen(true)}
              className="flex items-center gap-2 text-[17px] font-bold text-gray-700 transition-colors"
            >
              <FaUserCircle size={20} />
              Login
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 text-[17px] font-bold text-gray-700 transition-colors"
            >
              <FaShoppingCart size={20} />
              Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs h-5 w-5 rounded-full flex items-center justify-center font-bold shadow-lg">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Icons */}
          <div className="flex md:hidden items-center gap-4 ml-auto">
            <button onClick={() => setIsCartOpen(true)} className="relative transition-transform">
              <FaShoppingCart size={20} className="text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs h-4 w-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            <button onClick={() => setMobileMenu(true)} className="transition-transform">
              <FaBars size={22} className="text-gray-700" />
            </button>
          </div>
        </div>

        {/* Search - Mobile */}
        <div className="md:hidden px-4 pb-3">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder='Search for "amul butter"'
              className="w-full h-10 pl-11 pr-4 text-sm rounded-xl border border-gray-300"
            />

            {/* Search Results Dropdown - Mobile */}
            {showSearchDropdown && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-80 overflow-y-auto z-50">
                {searchResults.length > 0 ? (
                  searchResults.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleProductClick(product.id)}
                      className="flex items-center gap-3 p-3 cursor-pointer border-b last:border-b-0"
                    >
                      <img
                        src={product.img}
                        alt={product.name}
                        className="w-14 h-14 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm text-black">{product.name}</h4>
                        <p className="text-xs text-gray-500">{product.pack}</p>
                        <p className="text-sm font-bold text-green-700">₹{product.price}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center">
                    <p className="text-black font-bold text-lg">😔 No Product Available</p>
                    <p className="text-gray-500 text-sm mt-1">Try searching with different keywords</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ===== Mobile Menu ===== */}
      {mobileMenu && (
        <div className="fixed inset-0 z-50 bg-black/40">
          <div className="absolute right-0 top-0 h-full w-64 bg-white shadow-lg p-5">
            <button className="absolute top-4 right-4" onClick={() => setMobileMenu(false)}>
              <MdClose size={24} />
            </button>

            <div className="mt-10 space-y-5">
              <button
                onClick={() => { setIsLoginPopupOpen(true); setMobileMenu(false); }}
                className="flex items-center gap-2 text-lg font-bold text-gray-700 transition-colors"
              >
                <FaUserCircle />
                Login
              </button>

              <div className="text-sm text-gray-700 font-semibold">
                <span className="bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">⚡ 12 minutes</span>
                <br />
                <button 
                  onClick={changeLocation}
                  className="flex items-center gap-1 mt-1 transition-colors"
                >
                  <FaMapMarkerAlt className="text-green-600" size={12} />
                  <span className="max-w-[200px] truncate" title={userLocation || "Set Location"}>
                    {userLocation || "Set Location"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Login Popup */}
      <Login isOpen={isLoginPopupOpen} onClose={() => setIsLoginPopupOpen(false)} />

      {/* Location Prompt */}
      {showLocationPrompt && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-7 transform transition-all duration-300 scale-100 animate-slideUp">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent flex items-center gap-2">
                <FaMapMarkerAlt className="text-green-600" /> Set Your Location
              </h3>
              <button 
                onClick={() => setShowLocationPrompt(false)}
                className="text-gray-400 transition-all duration-300"
              >
                <MdClose size={24} />
              </button>
            </div>
            <p className="text-gray-600 mb-6 text-base">Get products delivered in just 12 minutes! Share your location for the fastest service.</p>
            <div className="flex flex-col gap-3">
              <button
                onClick={detectLocation}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-3.5 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
              >
                <FaMapMarkerAlt /> Use Current Location
              </button>
              <button
                onClick={() => { setShowLocationPrompt(false); setIsLocationModalOpen(true); }}
                className="w-full bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 font-semibold py-3.5 px-4 rounded-xl transition-all duration-300 shadow-md"
              >
                Enter Location Manually
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Location Modal */}
      {isLocationModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-7 transform transition-all duration-300 scale-100 animate-slideUp">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent flex items-center gap-2">
                <FaMapMarkerAlt className="text-green-600" /> Enter Your Location
              </h3>
              <button 
                onClick={() => setIsLocationModalOpen(false)}
                className="text-gray-400 transition-all duration-300"
              >
                <MdClose size={24} />
              </button>
            </div>
            <form onSubmit={handleManualLocation} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Your Location</label>
                <input
                  type="text"
                  name="location"
                  placeholder="Enter your area, street, or landmark"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all"
                  required
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={detectLocation}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
                >
                  <FaMapMarkerAlt /> Detect
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 shadow-lg"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40" onClick={() => setIsCartOpen(false)}></div>
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
            <button onClick={() => setIsCartOpen(false)} className="absolute top-4 right-4">
              <MdClose size={24} />
            </button>
            <Cart onClose={() => setIsCartOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}