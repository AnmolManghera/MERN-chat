import express from 'express'
const router = express.Router();

import {loginUser,logoutUser,registerUser,updateUserProfile,getUserProfile} from '../controllers/userControllers.js';
import { auth } from '../middlewares/authMiddleware.js';
router.post("/register",registerUser)
router.post("/login",loginUser)
router.post("/logout",logoutUser)
router.route("/profile").get(auth,getUserProfile).put(auth,updateUserProfile)

export default router;



