import { FaCheckCircle } from "react-icons/fa";

export default function PromoBanners() {
  return (
    <div className="w-full bg-white py-8 font-inter">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* LEFT RED BANNER */}
        <div
          className="relative rounded-3xl p-8 text-white overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #ff5f5f 0%, #d62828 100%)",
          }}
        >
          <h2 className="text-[28px] font-extrabold leading-tight">
            Get Cigarettes <br />
            at <span className="bg-green-600 px-3 py-1 rounded-lg">₹0</span>{" "}
            Convenience Fee
          </h2>

          <p className="mt-3 text-[16px] opacity-90">
            Get smoking accessories & more
          </p>

          <button className="mt-6 bg-black text-white px-6 py-3 rounded-xl text-[15px] font-semibold">
            Order now
          </button>

          {/* Decorative items */}
          <div className="absolute right-6 bottom-4 text-[80px] opacity-20">
            ❄️
          </div>
        </div>

        {/* RIGHT PURPLE BANNER */}
        <div className="rounded-3xl bg-[#efe3ff] p-8">
          <p className="text-[14px] font-bold text-purple-700 uppercase tracking-wide">
            All New Zeggo Experience
          </p>

          <div className="grid grid-cols-2 gap-4 mt-5">
            <div className="bg-white rounded-2xl p-5 flex items-center gap-3">
              <span className="text-[28px] font-extrabold text-purple-700">
                ₹0
              </span>
              <span className="text-[16px] font-semibold text-gray-700">
                Fees
              </span>
            </div>

            <div className="bg-white rounded-2xl p-5 flex items-center gap-3">
              <span className="text-[16px] font-semibold text-purple-700">
                Everyday <br /> Lowest Prices
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-5 mt-6 text-[14px] font-medium text-gray-700">
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-green-600" />
              ₹0 Handling Fee
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-green-600" />
              ₹0 Delivery Fee
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-green-600" />
              ₹0 Rain & Surge Fee
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
