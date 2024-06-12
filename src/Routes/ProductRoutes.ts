import { Router } from "express";
import { addProduct,deleteProduct,getProduct,getProducts,updateProduct } from "../Controllers/ProductControllers";

const ProductsRouter = Router()
ProductsRouter.post("",addProduct)
ProductsRouter.post("",getProducts)
ProductsRouter.post("/:id",getProduct)
ProductsRouter.post("/:id",updateProduct)
ProductsRouter.post("/:id",deleteProduct)

export default ProductsRouter