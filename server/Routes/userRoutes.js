import { Router } from "express";
import  {getUserData}  from "../Controllers/userController.js";
import authMiddleware from "../middleware/userAuth.js";

const route= Router();


route.get('/data',authMiddleware,getUserData);

export default route;
