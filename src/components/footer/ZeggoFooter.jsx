import React from "react";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaTwitter,
  FaFacebookF,
  FaLinkedinIn,
  FaGooglePlay,
  FaApple,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-10 font-inter">
      <div className="max-w-7xl mx-auto px-4">

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand + Social */}
          <div>
            <h2 className="text-3xl font-[Nunito] font-extrabold text-pink-600 mb-5">
              zeggo
            </h2>

            <div className="flex gap-4 mb-6">
              {[
                FaInstagram,
                FaTwitter,
                FaFacebookF,
                FaLinkedinIn,
              ].map((Icon, i) => (
                <span
                  key={i}
                  className="w-10 h-10 rounded-full border border-gray-300
                             flex items-center justify-center
                             text-gray-600 hover:text-pink-600
                             hover:border-pink-600 cursor-pointer
                             transition"
                >
                  <Icon size={18} />
                </span>
              ))}
            </div>

            <p className="text-sm text-gray-600">
              © Zeggo Marketplace Private Limited
            </p>
            <p className="text-sm text-gray-600 mt-1">
              FSSAI Lic No : 11224999000872
            </p>
          </div>

          {/* Links 1 */}
          <div>
            <ul className="space-y-3 text-sm">
              {[
                "Home",
                "Delivery Areas",
                "Careers",
                "Customer Support",
                "Press",
                "Mojo - a Zeggo Blog",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-800 hover:text-pink-600"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <ul className="space-y-3 text-sm">
              {[
                "Privacy Policy",
                "Terms of Use",
                "Responsible Disclosure Policy",
                "Sell on Zeggo",
                "Deliver with Zeggo",
                "Franchise with Zeggo",
              ].map((item) => (
                <li key={item}>
                  {item === "Privacy Policy" ? (
                    <Link
                      to="/privacy-policy"
                      className="text-gray-800 hover:text-pink-600"
                    >
                      {item}
                    </Link>
                  ) : (
                    <a
                      href="#"
                      className="text-gray-800 hover:text-pink-600"
                    >
                      {item}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* App Download */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">
              Download App
            </h3>

            <div className="space-y-3">
              <a
                href="#"
                className="flex items-center justify-center gap-2
                           border border-gray-300 rounded-lg px-4 py-2
                           hover:bg-gray-50 text-sm font-medium"
              >
                <FaGooglePlay size={18} />
                Get it on Play Store
              </a>

              <a
                href="#"
                className="flex items-center justify-center gap-2
                           border border-gray-300 rounded-lg px-4 py-2
                           hover:bg-gray-50 text-sm font-medium"
              >
                <FaApple size={18} />
                Get it on App Store
              </a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;