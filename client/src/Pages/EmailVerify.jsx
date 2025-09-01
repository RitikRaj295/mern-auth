import assets from "../assets/assets"
import { useRef } from "react"
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import axios from "axios";
import { getUserData, setIsLoggedIn } from "../Slice/authSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";

const EmailVerify = () => {

  const dispatch = useDispatch();
const inputRef= useRef([]);
const navigate=useNavigate();

 const { backendUrl,isLoggedIn,userData } = useSelector((state) => state.auth);

const handleSubmit= async(e)=>{
    try {
      e.preventDefault();
      const otpArray= inputRef.current.map(e => e.value)

      const otp=otpArray.join('');

      const {data} = await axios.post(backendUrl+ '/api/auth/verify-account',{otp},{withCredentials:true})
      if(data.success){
        toast.success(data.message);
        dispatch(getUserData());
        navigate('/');
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message)
    }
}



const handleInput = (e, index) => {  // e is here the event coming as a parameter
  if (
    e.target.value.length > 0 &&
    index < inputRef.current.length - 1
  ) {
    inputRef.current[index + 1].focus();
  }
};

const handleKeyDown=(e,index)=>{
  if(e.key==="Backspace" && e.target.value===''&& index > 0){
       inputRef.current[index - 1].focus(); 
  }
}

const handlePaste = (e) => {
  const paste = e.clipboardData.getData('text')
  const pasteArray = paste.split('');
  pasteArray.forEach((char, index) => {
    if (inputRef.current[index]) {
      inputRef.current[index].value = char;
    }
  })
}


useEffect(()=>{
  isLoggedIn && userData && userData.isAccountVerified && navigate('/')
},[isLoggedIn,userData])



  return (
    <div className=" flex flex-col justify-center items-center min-h-screen px-6 bg-gradient-to-br from-blue-300 to-purple-500 ">
       <img
        className="absolute top-5 left-10 sm:left-20 sm:w-32 inset-x-15 w-28 cursor-pointer"
        src={assets.logo}
        alt="logo"
        onClick={() => navigate("/")}
      />

      <form onSubmit={handleSubmit} className="bg-slate-900 rounded-xl shadow-[2px_2px_8px_white]  flex flex-col border-1 px-6 py-5 text-center">
        <h1 className="text-xl font-semibold text-white">Email Verify Otp</h1>
        <p className="text-sm mt-1 text-indigo-400">Enter the 6-digit code sent to you email</p>
        <div className="flex justify-center mb-5 mt-5 gap-1 "    onPaste={handlePaste}>
          {Array(6).fill(0).map((_, index) => {
  return (
    <input
      type="text"
      maxLength="1"
      key={index}
      required
      className="w-12 h-12 bg-[#333A5C] text-whp text-center cursor-pointer text-2xl text-indigo-200 select-none rounded-lg"
      ref={e=>inputRef.current[index]=e}
      onInput={(e)=> handleInput(e,index)}
      onKeyDown={(e)=> handleKeyDown(e,index)}
   
    />
  )
})}
        </div>


        <button className=" bg-gradient-to-r mb-4 sm:mb-2 cursor-pointer from-indigo-400 to bg-indigo-800 text-sm px-27 py-2.5 rounded-full text-white">Verify email</button>
      </form>
    </div>
  )
}

export default EmailVerify
