import { Router } from "express";
import authenticate from "../middlewares/auth.middleware.js";
import { me } from "../controllers/users.controller.js";

const users_router = Router();

users_router.get("/me", authenticate, me);

export default users_router;