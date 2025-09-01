import assets from "../assets/assets.js";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setIsLoggedIn, clearUserData, setLoading } from "../Slice/authSlice.js";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, userData, backendUrl, loading } = useSelector(
    (state) => state.auth
  );

  const sendVerifyOtp = async () => {
    if (loading) return; 
    dispatch(setLoading(true));
    try {
      console.log("sendVerifyotp route is making request to backend");
      const { data } = await axios.post(
        backendUrl + "/api/auth/send-verify-otp",
        {},
        { withCredentials: true }
      );
      console.log(data);
      if (data.success) {
        navigate("/email-verify");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const logout = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/logout",
        {},
        { withCredentials: true }
      );
      dispatch(setIsLoggedIn(false));
      dispatch(clearUserData(null));
      navigate("/");
      toast.success("Logout Successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="h-[12vh] w-screen m-auto flex justify-center items-center shadow-lg">
      <div className="container h-full w-[90vw] flex justify-between items-center">
        <img
          src={assets.logo}
          alt="logo"
          className="w-24 h-24 transition-transform transform-3d"
        />
        {userData ? (
          <div className="border flex justify-center items-center h-10 w-10 rounded-full bg-blue-900 text-white text-xl border-black relative group">
            {userData.name[0].toUpperCase()}
            <div className="absolute pt-10 top-0 z-10 right-5 text-black hidden group-hover:block cursor-pointer text-sm">
              <ul className="list-none m-0 px-1 text-gray-800 bg-gray-300 rounded-xl flex flex-col p-2">
                {!userData.isAccountVerified && (
                  <li
                    onClick={!loading ? sendVerifyOtp : undefined}
                    className={`py-1 px-2 rounded-lg w-25 ${
                      loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "hover:bg-gray-200 cursor-pointer"
                    }`}
                  >
                    {loading ? "Sending..." : "Verify Email"}
                  </li>
                )}
                <li
                  onClick={logout}
                  className="py-1 px-2 hover:bg-gray-200 rounded-lg cursor-pointer"
                >
                  Log out
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="h-10 w-25 rounded-3xl flex justify-center items-center gap-2 text-sm bg-gray-200 text-gray-700 hover:bg-gradient-to-tr from-blue-300 to-pink-400 via-white"
          >
            Login{" "}
            <img src={assets.arrow_icon} alt="arrow" className="h-4 w-3" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
