import { Router } from "express";
import {register,login,logout, sendVerifyOtp, verifyEmail, isAuthenticated, sendResetOtp, resetPassword} from "../Controllers/authController.js"
import authMiddleware from "../middleware/userAuth.js";
 const route = Router();

route.post('/register',register);
route.post('/login',login);
route.post('/logout',logout)
route.post('/send-verify-otp',authMiddleware,sendVerifyOtp);
route.post('/verify-account',authMiddleware,verifyEmail);
route.get('/is-auth',authMiddleware,isAuthenticated);
route.post('/send-reset-otp',sendResetOtp);
route.post('/reset-password',resetPassword);

export default route;