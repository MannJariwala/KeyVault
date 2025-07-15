import { Router } from "express";
import {
  handleSignUp,
  handleLogin,
  handleOnLoadDashboard,
  handleLogout,
} from "../controller/authController.js";
import { protectAuthentication } from "../middleware/authMiddleware.js";

const router = Router();

router
  .route("/signup")
  .get((req, res) => {
    res.render("Signup");
  })
  .post(handleSignUp);

router
  .route("/login")
  .get((req, res) => {
    res.render("login");
  })
  .post(handleLogin);

router.get("/dashboard", protectAuthentication, handleOnLoadDashboard);

router.post("/logout", handleLogout);

export default router;
