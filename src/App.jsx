import React, { useEffect } from "react";
import { CartProvider } from "./context/CartContext";
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import CategoryBar from "./components/custom/CategoryBar";
import CategoryCards from "./components/pages/CategoryCards";
import PromoBanners from "./components/pages/PromoBanners";
import LaundryCare from "./components/pages/product/LaundryCare";
import HouseholdCleaning from "./components/pages/product/HouseholdCleaning";
import PopularSearches from "./components/footer/PopularSearchesSection";
import Footer from "./components/footer/ZeggoFooter";
import HowItWorks from "./components/pages/HowItWorks";
import CafeBanner from "./components/pages/cafe/CafeBanner";
import FreshCategory from "./components/pages/fresh/FreshCategories";
import Home from "./components/pages/home/Home";
import Toys from "./components/pages/toys/Toys";
import Electronics from "./components/pages/electronics/Electronics";
import Mobiles from "./components/pages/mobiles/Mobiles";
import Beauty from "./components/pages/beauty/Beauty";
import Fashion from "./components/pages/fashion/Fashion";
import ProductDetail from "./components/pages/product/ProductDetail";
import OrderTracking from "./components/pages/OrderTracking";
import PrivacyPolicy from "./components/pages/PrivacyPolicy";

function AppContent() {
  const location = useLocation();
  const isProductDetailPage = location.pathname.startsWith("/product/");
  const isOrderTrackingPage = location.pathname === "/order-tracking";

  // Note: Footer is now shown on all pages regardless of route

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="font-inter" style={{scrollBehavior: "smooth"}}>
      {/* NAVBAR - Always show */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white">
        <Navbar />
        {/* CATEGORY BAR - Hide on product detail and order tracking page */}
        {!isProductDetailPage && !isOrderTrackingPage && <CategoryBar />}
        {/* Note: Footer is now shown on all pages, including product detail and order tracking */}
      </div>

      {/* PAGE CONTENT */}
      <div className="pt-[140px]">
        <Routes>
          <Route path="/" element={
            <>
              <CategoryCards />
              <PromoBanners />
              <LaundryCare />
              <HouseholdCleaning />
              <HowItWorks/>
            </>
          } />
          <Route path="/cafe" element={<CafeBanner />} />
          <Route path="/home" element={<Home />} />
          <Route path="/toys" element={<Toys />} />
          <Route path="/fresh" element={<FreshCategory />} />
          <Route path="/electronics" element={<Electronics />} />
          <Route path="/mobiles" element={<Mobiles />} />
          <Route path="/beauty" element={<Beauty />} />
          <Route path="/fashion" element={<Fashion />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/order-tracking" element={<OrderTracking />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      </div>

      {/* FOOTER - Show on all pages */}
      <>
        <PopularSearches/>
        <Footer/>
      </>
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </HelmetProvider>
  );
}

export default App;
