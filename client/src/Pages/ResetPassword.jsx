import assets from "../assets/assets.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "../Slice/authSlice.js";
import axios from "axios";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);
  const [otp, setOtp] = useState(Array(6).fill(""));

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { backendUrl, loading } = useSelector((state) => state.auth);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      const { data } = await axios.post(backendUrl + "/api/auth/send-reset-otp", { email });
      if (data.success) {
        toast.success(data.message);
        setIsEmailSent(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const onSubmitOTP = (e) => {
    e.preventDefault();
    setIsOtpSubmitted(true);
  };

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      const otpValue = otp.join("");
      const { data } = await axios.post(
        backendUrl + "/api/auth/reset-password",
        { email, otp: otpValue, newPassword }
      );
      if (data.success) {
        toast.success(data.message);
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleOtpChange = (value, index) => {
    if (/^\d?$/.test(value)) {
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);

      if (value && index < otp.length - 1) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").slice(0, 6).split("");
    const updatedOtp = [...otp];
    paste.forEach((char, i) => {
      updatedOtp[i] = char;
    });
    setOtp(updatedOtp);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-6 bg-gradient-to-br from-blue-300 to-purple-500">
      <img
        className="absolute top-5 left-10 sm:left-20 sm:w-32 inset-x-15 w-28 cursor-pointer"
        src={assets.logo}
        alt="logo"
        onClick={() => navigate("/")}
      />

      {!isEmailSent && (
        <form
          onSubmit={handleEmailSubmit}
          className="bg-slate-900 rounded-xl shadow-[2px_2px_8px_white] flex flex-col border-1 px-6 py-5 text-center"
        >
          <h1 className="text-xl font-semibold text-white">Reset Password</h1>
          <p className="text-sm mt-1 text-indigo-400">Enter your registered email address</p>
          <div className="mb-4 mt-4 w-full flex items-center px-5 py-2.5 rounded-full bg-[#333A5c] gap-3">
            <img src={assets.mail_icon} alt="logo" className="w-3 h-3" />
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-transparent outline-none text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            disabled={loading}
            className="bg-gradient-to-r mb-3 sm:mb-2 cursor-pointer from-indigo-400 to bg-indigo-800 text-sm px-27 py-2.5 rounded-full text-white"
          >
            {loading ? "Please wait..." : "Submit"}
          </button>
        </form>
      )}

      {isEmailSent && !isOtpSubmitted && (
        <form
          onSubmit={onSubmitOTP}
          className="bg-slate-900 rounded-xl shadow-[2px_2px_8px_white] flex flex-col border-1 px-6 py-5 text-center"
        >
          <h1 className="text-xl font-semibold text-white">Reset Password Otp</h1>
          <p className="text-sm mt-1 text-indigo-400">Enter the 6-digit code sent to your email</p>
          <div className="flex justify-center mb-5 mt-5 gap-1" onPaste={handlePaste}>
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleOtpChange(e.target.value, index)}
                onKeyDown={(e) => handleOtpKeyDown(e, index)}
                className="w-12 h-12 bg-[#333A5C] text-center text-2xl text-indigo-200 rounded-lg"
                required
              />
            ))}
          </div>
          <button
            disabled={loading}
            className="bg-gradient-to-r mb-4 sm:mb-2 cursor-pointer from-indigo-400 to bg-indigo-800 text-sm px-27 py-2.5 rounded-full text-white"
          >
            {loading ? "Please wait..." : "Submit"}
          </button>
        </form>
      )}

      {isOtpSubmitted && isEmailSent && (
        <form
          onSubmit={onSubmitNewPassword}
          className="bg-slate-900 rounded-xl shadow-[2px_2px_8px_white] flex flex-col border-1 px-6 py-5 text-center"
        >
          <h1 className="text-xl font-semibold text-white">New Password</h1>
          <p className="text-sm mt-1 text-indigo-400">Enter the new password below</p>
          <div className="mb-4 mt-4 w-full flex items-center px-5 py-2.5 rounded-full bg-[#333A5c] gap-3">
            <img src={assets.lock_icon} alt="logo" className="w-3 h-3" />
            <input
              type="password"
              placeholder="Enter new password"
              className="bg-transparent outline-none text-white"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button
            disabled={loading}
            className="bg-gradient-to-r mb-3 sm:mb-2 cursor-pointer from-indigo-400 to bg-indigo-800 text-sm px-27 py-2.5 rounded-full text-white"
          >
            {loading ? "Please wait..." : "Submit"}
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;

