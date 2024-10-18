import express from "express";
const router = express.Router();
import { handleSignUp, handleSignIn, logOut } from "../Controllers/userAuth.js";

router.post("/signup", handleSignUp);

router.post("/signin", handleSignIn);

router.post("/logout", logOut);

export default router;