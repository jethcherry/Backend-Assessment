import { Router } from 'express';
import { addCategory, getCategories, getCategory, updateCategory, deleteCategory } from "../Controllers/CategoryController";

const CategoryRouter = Router();

CategoryRouter.post("/", addCategory);
CategoryRouter.get("/", getCategories);
CategoryRouter.get("/:id", getCategory);
CategoryRouter.put("/:id", updateCategory);
CategoryRouter.delete("/:id", deleteCategory);

export default CategoryRouter;
