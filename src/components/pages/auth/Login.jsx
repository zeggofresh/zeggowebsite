import React, { useState, useRef } from "react";
import { X } from "lucide-react";

const Login = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [otp, setOtp] = useState(Array(4).fill(""));
  const inputsRef = useRef([]);

  const handlePhoneChange = (e) => {
    if (/^\d*$/.test(e.target.value) && e.target.value.length <= 10)
      setPhoneNumber(e.target.value);
  };

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) inputsRef.current[index + 1].focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0)
      inputsRef.current[index - 1].focus();
  };

  const handleVerify = () => {
    const code = otp.join("");
    if (code.length === 4) {
      setOtp(Array(4).fill(""));
      setPhoneNumber("");
      setShowOtpScreen(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-3 z-50">
      <div className="bg-white rounded-3xl w-full max-w-5xl grid md:grid-cols-2 min-h-[85vh] overflow-hidden shadow-2xl relative">

        {/* CLOSE ICON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-white p-2 rounded-full shadow hover:bg-gray-100"
        >
          <X size={22} />
        </button>

        {/* LEFT */}
        <div className="bg-gradient-to-br from-green-600 to-emerald-800 p-8 md:p-12 text-white flex flex-col justify-center space-y-10">

          <div>
            <h1 className="text-4xl font-extrabold">Zeggo</h1>
            <p className="opacity-90 text-sm mt-1">Fresh Grocery Delivered Fast</p>
          </div>

          {!showOtpScreen ? (
            <div className="space-y-5">
              <div className="bg-white rounded-full flex items-center px-5 py-3 text-black">
                <span className="mr-2 text-gray-600">+91</span>
                <input
                  className="w-full outline-none text-sm"
                  placeholder="Enter phone number"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                />
              </div>

              <button
                onClick={() => setShowOtpScreen(true)}
                className="w-full py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 transition-all duration-300 font-semibold shadow-lg"
              >
                Send OTP
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-center gap-3">
                {otp.map((v, i) => (
                  <input
                    key={i}
                    ref={(el) => (inputsRef.current[i] = el)}
                    value={v}
                    maxLength="1"
                    inputMode="numeric"
                    onChange={(e) => handleOtpChange(e, i)}
                    onKeyDown={(e) => handleKeyDown(e, i)}
                    className="w-14 h-14 rounded-xl border-2 text-center text-xl font-bold text-white bg-transparent focus:border-pink-400 outline-none"
                  />
                ))}
              </div>

              <button
                onClick={handleVerify}
                className="w-full py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 transition-all duration-300 font-semibold shadow-lg"
              >
                Verify OTP
              </button>
            </div>
          )}
        </div>

        {/* RIGHT */}
        <div className="hidden md:flex flex-col items-center justify-center p-10 bg-green-50">
          <img
            src="https://cdn-icons-png.flaticon.com/512/891/891462.png"
            className="w-52 mb-6"
            alt=""
          />
          <h2 className="text-2xl font-bold text-green-800">
            Order Faster with Zeggo
          </h2>
          <p className="text-gray-600 text-sm mt-2 text-center max-w-xs">
            Get groceries delivered to your doorstep in minutes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
