import { Router } from "express";
import { addProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../Controllers/ProductControllers";
import { verifyTokens } from "../Middlewares";

const ProductsRouter = Router();

ProductsRouter.post("/", addProduct); // Correct HTTP method for creating a product
ProductsRouter.get("/",getProducts); // Correct HTTP method for getting all products
ProductsRouter.get("/:id", getProduct); // Correct HTTP method for getting a single product by id
ProductsRouter.put("/:id", updateProduct); // Correct HTTP method for updating a product by id
ProductsRouter.delete("/:id", deleteProduct); // Correct HTTP method for deleting a product by id

export default ProductsRouter;
