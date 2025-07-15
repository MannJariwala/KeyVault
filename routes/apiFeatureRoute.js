import { Router } from "express";
import {
  handleDelete,
  handleDisplayEdit,
  handleEdit,
  handleCopy,
  handleShowAddPage,
  handleAddKey,
} from "../controller/apiFeatureController.js";
import { protectAuthentication } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/delete/:id", protectAuthentication, handleDelete);

router.get("/edit/:id", protectAuthentication, handleDisplayEdit);

router.post("/edit/:id",handleEdit)

router.post("/copy/:id", protectAuthentication, handleCopy);

router
  .route("/add")
  .get(protectAuthentication, handleShowAddPage)
  .post(protectAuthentication, handleAddKey);
export default router;
