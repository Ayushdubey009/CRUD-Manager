import { Router } from "express";
import { createProduct, getProducts, updateProduct, deleteProduct } from "../controllers/product";

const router = Router();

router.post("/", createProduct);
router.get("/", getProducts);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
