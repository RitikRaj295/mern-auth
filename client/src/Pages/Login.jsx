import React, { useState } from "react";
import assets from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setIsLoggedIn, getUserData, setLoading } from "../Slice/authSlice.js";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("Sign up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { backendUrl, loading } = useSelector((state) => state.auth);

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(setLoading(true));

    try {
      if (state === "Sign up") {
        const { data } = await axios.post(
          backendUrl + "/api/auth/register",
          { name, email, password },
          { withCredentials: true }
        );

        if (data.success) {
          dispatch(setIsLoggedIn(true));
          dispatch(getUserData());
          navigate("/");
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(
          backendUrl + "/api/auth/login",
          { email, password },
          { withCredentials: true }
        );

        if (data.success) {
          dispatch(setIsLoggedIn(true));
          dispatch(getUserData());
          navigate("/");
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-6 bg-gradient-to-br from-blue-300 to-purple-500">
      <img
        className="absolute top-5 left-10 sm:left-20 sm:w-32 inset-x-15 w-28 cursor-pointer"
        src={assets.logo}
        alt="logo"
        onClick={() => navigate("/")}
      />

      <div className="bg-slate-900 rounded-xl shadow-[2px_2px_8px_white] flex flex-col border-1 px-6 py-5 text-center">
        <h1 className="text-3xl font-semibold text-white">
          {state === "Sign up" ? "Create Account" : "Login"}
        </h1>
        <p className="text-sm text-indigo-400">
          {state === "Sign up"
            ? "Create your account"
            : "Login to your account"}
        </p>

        <form onSubmit={handleSubmit}>
          {state === "Sign up" && (
            <div className="flex mb-4 mt-2 gap-3 border-1 rounded-full px-5 py-2.5 bg-[#333A5C]">
              <img src={assets.person_icon} alt="person icons" />
              <input
                className="text-sm text-white bg-transparent outline-none"
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Full Name"
                required
              />
            </div>
          )}

          <div className="flex mb-4 mt-2 gap-3 border-1 rounded-full px-5 py-2.5 bg-[#333A5C]">
            <img src={assets.mail_icon} alt="mail icons" />
            <input
              className="text-sm text-white bg-transparent outline-none"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email"
              required
            />
          </div>

          <div className="flex mb-2 mt-2 gap-3 border-1 rounded-full px-5 py-2.5 bg-[#333A5C]">
            <img src={assets.lock_icon} alt="lock icons" />
            <input
              className="text-sm text-white bg-transparent outline-none"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              required
            />
          </div>

          <p
            className="text-sm text-indigo-400 text-start cursor-pointer mb-2"
            onClick={() => navigate("/reset-password")}
          >
            Forgot Password?
          </p>

          <button
            type="submit"
            disabled={loading}
            className={`bg-gradient-to-r mb-4 sm:mb-2 px-6 py-2.5 rounded-full text-white text-sm ${
              loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            } from-indigo-400 to-indigo-800`}
          >
            {loading ? "Please wait..." : state}
          </button>

          {state === "Sign up" ? (
            <p className="text-xs text-gray-500">
              Already have an account?{" "}
              <span
                onClick={() => setState("Login")}
                className="text-blue-500 underline cursor-pointer"
              >
                Login here
              </span>
            </p>
          ) : (
            <p className="text-xs text-gray-500">
              Don't have an account?{" "}
              <span
                className="text-blue-500 underline cursor-pointer"
                onClick={() => setState("Sign up")}
              >
                Sign up
              </span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
