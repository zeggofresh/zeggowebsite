import React, { useState } from "react";

const Login = ({ isOpen, onClose }) => {
  // Don't render if not open
  if (!isOpen) return null;

  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  // Handle phone number input
  const handlePhoneChange = (e) => {
    const value = e.target.value;
    // Only allow numbers and limit to 10 digits
    if (/^\d*$/.test(value) && value.length <= 10) {
      setPhoneNumber(value);
    }
  };

  // Handle continue button click
  const handleContinue = () => {
    if (phoneNumber.length === 10) {
      setShowOtpScreen(true);
      // Start timer for resend OTP
      startTimer();
      // In a real app, you would send OTP to the user here
      console.log("Sending OTP to", phoneNumber);
    }
  };

  // Handle OTP input
  const handleOtpChange = (element, index) => {
    const value = element.value;
    if (/^[0-9]$/.test(value)) {
      // Update OTP digit
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to next input if available
      if (index < 5 && element.nextSibling) {
        element.nextSibling.focus();
      }
    } else if (value === "") {
      // Handle backspace
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
    }
  };

  // Handle OTP paste
  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").slice(0, 6);
    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split("");
      setOtp(newOtp);
    }
  };

  // Start resend timer
  const startTimer = () => {
    setCanResend(false);
    setTimer(30);
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Resend OTP
  const resendOtp = () => {
    if (canResend) {
      // In a real app, you would resend OTP to the user here
      console.log("Resending OTP to", phoneNumber);
      startTimer();
    }
  };

  // Handle OTP submit
  const handleOtpSubmit = () => {
    const otpString = otp.join("");
    if (otpString.length === 6) {
      // In a real app, you would verify OTP here
      console.log("Verifying OTP:", otpString);
      alert("Login successful!"); // Simple success message for demo
      onClose(); // Close the login popup
    }
  };

  // Back to phone number screen
  const backToPhone = () => {
    setShowOtpScreen(false);
    setOtp(Array(6).fill(""));
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4 z-50">
      <div className="bg-white rounded-2xl overflow-hidden w-full max-w-4xl grid md:grid-cols-2 shadow-2xl">

        {/* LEFT SECTION */}
        <div className="bg-gradient-to-br from-green-600 to-emerald-800 p-8 text-white flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-4 tracking-wide">
              Zeggo
            </h1>
            <p className="text-xl font-semibold">
              Fresh Grocery Everyday
            </p>
            <p className="text-sm mt-2 opacity-90">
              Delivered in just 15 minutes*
            </p>
          </div>

          {!showOtpScreen ? (
            /* PHONE INPUT SCREEN */
            <div>
              <div className="bg-white rounded-full flex items-center px-4 py-3 text-black mb-4">
                <span className="mr-2 text-gray-600">+91</span>
                <input
                  type="tel"
                  placeholder="Enter Phone Number"
                  className="w-full outline-none text-sm"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  maxLength={10}
                />
              </div>

              <button 
                className={`w-full py-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold hover:opacity-90 transition ${phoneNumber.length !== 10 ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handleContinue}
                disabled={phoneNumber.length !== 10}
              >
                Continue
              </button>

              <p className="text-xs text-center mt-4 opacity-80">
                By continuing you agree to our <br />
                <span className="underline">Terms of Service</span> &{" "}
                <span className="underline">Privacy Policy</span>
              </p>
            </div>
          ) : (
            /* OTP INPUT SCREEN */
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Verify Phone Number</h2>
                <p className="text-sm opacity-90">Enter the 6-digit code sent to</p>
                <p className="font-semibold flex items-center justify-center gap-2">
                  +91 {phoneNumber}
                  <button 
                    onClick={backToPhone}
                    className="text-xs underline"
                  >
                    Edit
                  </button>
                </p>
              </div>

              <div className="mb-6">
                <div className="flex justify-center gap-3 mb-4">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      type="tel"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleOtpChange(e.target, index)}
                      onPaste={handleOtpPaste}
                      className="w-12 h-12 text-center text-xl font-bold border-2 border-white rounded-lg bg-transparent outline-none focus:border-emerald-300"
                      autoFocus={index === 0}
                      ref={(input) => {
                        if (input && index === otp.findIndex(d => d === "")) {
                          input.focus();
                        }
                      }}
                    />
                  ))}
                </div>

                <div className="flex justify-center gap-2 text-sm mb-6">
                  <span>Didn't receive code?</span>
                  {canResend ? (
                    <button 
                      onClick={resendOtp}
                      className="font-semibold text-emerald-200 hover:text-white"
                    >
                      Resend OTP
                    </button>
                  ) : (
                    <span className="text-emerald-200">Resend in {timer}s</span>
                  )}
                </div>

                <button 
                  className={`w-full py-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold hover:opacity-90 transition ${otp.includes("") ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={handleOtpSubmit}
                  disabled={otp.includes("")}
                >
                  Verify OTP
                </button>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT SECTION */}
        <div className="relative bg-green-50 p-8 flex flex-col items-center justify-center text-center">
          <button 
            className="absolute top-4 right-4 text-gray-400 hover:text-black text-2xl"
            onClick={onClose}
          >
            ✕
          </button>

          <img
            src="https://cdn-icons-png.flaticon.com/512/891/891462.png"
            alt="App"
            className="w-40 mb-6"
          />

          <h2 className="text-2xl font-bold text-green-800">
            Order faster & easier
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            with the Zeggo App
          </p>

          {/* STORE BUTTONS */}
          <div className="space-y-3">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Google Play"
              className="h-12 cursor-pointer"
            />
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="App Store"
              className="h-12 cursor-pointer"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
