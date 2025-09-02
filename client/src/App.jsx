import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from './Pages/Home';
import Email from './Pages/EmailVerify';
import Login from './Pages/Login';
import ResetPassword from './Pages/ResetPassword';
import Error from './Pages/Error';
import {ToastContainer} from 'react-toastify';
import { useEffect } from "react";
import { getAuthState} from "./Slice/authSlice";
import { useDispatch } from "react-redux";



const App = () => {
  const dispatch = useDispatch();
  const Router= createBrowserRouter([
    {
      path:'/',
      element:<Home/>
    },
    {
      path:'/email-verify',
      element:<Email/> 
    },
    {
      path:'/login',
      element:<Login/>
    },
    {
      path:'/reset-password',
      element:<ResetPassword/>
    },
    {
      path:'*',
      element:<Error/>
    }

  ]);


  useEffect(()=>{
  dispatch(getAuthState());
  },[])

  return (
    <div>
      <ToastContainer/>
      <RouterProvider router={Router}/>
    </div>
  )
}

export default App
