import { Router } from "express";
import * as adminController from "../controllers/admin";

const router = Router();

router.get("/add-product", adminController.getAddProduct);
router.post("/add-product", adminController.postAddProduct);
router.get("/products", adminController.getProducts);
router.get("/edit-product/:productId", adminController.getEditProduct);
router.post("/edit-product/:productId", adminController.postEditProduct);
router.post("/delete-product", adminController.postDeleteProduct);

export default router;
