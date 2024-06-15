import { Router } from "express";
import { registerUser, loginUser } from "../Controllers/authControllers";
import { verifyTokens, welcomePage} from "../Middlewares";

const authRoutes = Router();
authRoutes.post("/register", registerUser);
authRoutes.post("/login", loginUser);
authRoutes.get("/",verifyTokens,welcomePage)

export default authRoutes;
