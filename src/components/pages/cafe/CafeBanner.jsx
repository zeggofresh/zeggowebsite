import cafeBanner from "../../../assets/zeggocafebanner.png";
import CafeProductCarousel from "./CafeProductCarousel";

export default function CafeBanner() {
  return (
    <>
    <div className="w-full bg-[#FFF6E5] py-6">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-center">
          
          <img
            src={cafeBanner}
            alt="Zeggo Cafe Banner"
            className="
              w-full max-w-5xl
              h-[180px] sm:h-[220px] md:h-[260px]
              rounded-2xl
              border-2 border-[#E6C89A]
              shadow-md
              object-cover
            "
          />

        </div>
      </div>
    </div>
    <CafeProductCarousel/>
    </>
  );
}
