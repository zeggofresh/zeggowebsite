import React, { useState } from "react";
import { HiArrowLeft, HiShare } from "react-icons/hi";
import { FaStar } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import AddButton from "../../custom/AddButton";
import SEO from "../../custom/SEO";
import { getProductById } from "../../../data/products";

export default function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addItem, updateQuantity, getCartItem } = useCart();
  
  let product = getProductById(productId);
  
  // Fallback: If product not found by ID, show a placeholder message
  // This handles cases where category products don't have matching IDs yet
  const [activeImg, setActiveImg] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <h2 className="text-3xl font-bold text-black mb-4">😔 Product Not Found</h2>
          <p className="text-gray-600 mb-6">Sorry, this product is currently unavailable.</p>
          <button
            onClick={() => navigate("/")}
            className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-lg font-bold"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  const productId_cart = product.name + product.price;
  const cartItem = getCartItem(productId_cart);
  const images = [product.img, product.img, product.img]; // Using same image 3 times

  return (
    <main className="min-h-screen bg-gray-50" style={{scrollBehavior: "smooth"}}>
      <SEO 
        title={`${product.name} - Buy Online at Best Price in India | Zeggo`}
        description={product.description || `Buy ${product.name} at best price in India. Shop online at Zeggo for quality products with fast delivery and great offers.`}
        keywords={`${product.name}, ${product.category}, online shopping, buy ${product.name}, best price, India`}
        canonical={`https://www.zeggo.com/product/${productId}`}
        image={product.img}
        structuredData={product && {
          "@context": "https://schema.org/",
          "@type": "Product",
          "name": product.name,
          "image": [product.img],
          "description": product.description || `Buy ${product.name} at best price in India. Shop online at Zeggo for quality products with fast delivery and great offers.`,
          "sku": product.id,
          "offers": {
            "@type": "Offer",
            "price": product.price,
            "priceCurrency": "INR",
            "availability": "https://schema.org/InStock",
            "seller": {
              "@type": "Organization",
              "name": "Zeggo"
            }
          },
          "aggregateRating": product.rating ? {
            "@type": "AggregateRating",
            "ratingValue": product.rating,
            "reviewCount": product.reviews || 0
          } : undefined,
          "brand": {
            "@type": "Brand",
            "name": "Zeggo"
          }
        }}
      />

      {/* ================= FIXED PRODUCT HEADER ================= */}
      <header className="fixed top-16 left-0 right-0 z-40 h-14 bg-white border-b shadow-sm flex items-center justify-between px-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full ml-7 hover:bg-gray-100"
        >
          <HiArrowLeft size={22} className="text-black" />
        </button>

        <h2 className="text-sm font-semibold text-black truncate">
          Product Details
        </h2>

        <button className="p-2 rounded-full mr-8 hover:bg-gray-100">
          <HiShare size={20} className="text-black" />
        </button>
      </header>

      {/* ================= SCROLLABLE CONTENT ================= */}
      {/* navbar (64px) + product header (56px) = pt-[120px] */}
      <div className="pt-[60px] pb-24">

        {/* BREADCRUMB */}
        <nav className="max-w-7xl mx-auto px-4 py-2 text-sm text-gray-500 flex items-center gap-1" aria-label="Breadcrumb">
          <a href="/" className="hover:underline">Home</a> <MdKeyboardArrowRight />
          <a href={`/${product.category.toLowerCase()}`} className="hover:underline">{product.category}</a> <MdKeyboardArrowRight />
          <span className="text-gray-900 font-medium truncate">
            {product.name}
          </span>
        </nav>

        <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* LEFT IMAGE */}
          <div className="flex gap-3">
            <div className="flex flex-col gap-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`w-12 h-12 border rounded-lg bg-white flex items-center justify-center ${
                    activeImg === i
                      ? "border-purple-600"
                      : "border-gray-200"
                  }`}
                >
                  <img src={img} className="h-9 object-contain" alt={`Thumbnail ${i+1} of ${product.name}`} />
                </button>
              ))}
            </div>

            <div className="flex-1 bg-white border rounded-xl p-3 flex justify-center items-center">
              <img
                src={images[activeImg]}
                className="h-[260px] lg:h-[320px] object-contain"
                alt={product.name}
              />
            </div>
          </div>

          {/* RIGHT DETAILS */}
          <div className="bg-white border rounded-xl p-4">
            <h1 className="text-lg font-bold mt-1">
              {product.name}
            </h1>

            <p className="text-sm text-gray-500">
              {product.pack}
            </p>

            {/* RATING */}
            {product.rating && (
              <div className="flex items-center gap-2 mt-2">
                <span className="flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded text-xs">
                  {product.rating} <FaStar size={11} />
                </span>
                <span className="text-xs text-gray-500">
                  ({product.reviews > 1000 ? `${(product.reviews / 1000).toFixed(1)}k` : product.reviews})
                </span>
              </div>
            )}

            {/* PRICE */}
            <div className="mt-4 border rounded-xl p-3 bg-green-50">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-black">
                  ₹{product.price}
                </span>
                {product.original && (
                  <>
                    <span className="line-through text-gray-400 text-sm">
                      ₹{product.original}
                    </span>
                    <span className="text-green-700 text-sm font-semibold">
                      ₹{product.original - product.price} OFF
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* DESCRIPTION */}
            {product.description && (
              <div className="mt-4">
                <h2 className="text-sm font-bold text-black mb-2">Description</h2>
                <p className="text-sm text-gray-700">{product.description}</p>
              </div>
            )}

            {/* FEATURES */}
            {product.features && product.features.length > 0 && (
              <div className="mt-4">
                <h2 className="text-sm font-bold text-black mb-2">Key Features</h2>
                <ul className="list-disc list-inside space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index} className="text-sm text-gray-700">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* ADD TO CART */}
            <div className="mt-6">
              <AddButton
                item={product}
                cartItem={cartItem}
                onAddToCart={(item) => addItem(item)}
                onQuantityChange={(item, qty) => updateQuantity(productId_cart, qty)}
                containerClass="w-full inline-flex items-center justify-center border-2 border-pink-600 rounded-lg overflow-hidden"
                buttonClass="w-full px-6 py-3 bg-pink-600 text-white font-bold text-base"
                minusButtonClass="px-4 py-3 bg-white text-pink-600 font-bold text-base"
                plusButtonClass="px-4 py-3 bg-pink-600 text-white font-bold text-base"
                quantityClass="px-6 py-3 bg-white text-black font-bold text-base"
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
