import express from "express";
import {
  authCheck,
  login,
  logout,
  signup,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

// signup API
router.post("/signup", signup);
// login API
router.post("/login", login);
// logout API
router.post("/logout", logout);
// authCheck API
router.get("/authCheck", protectRoute, authCheck);

export default router;
