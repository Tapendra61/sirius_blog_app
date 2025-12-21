import { Router } from "express";
import authenticate from "../middlewares/auth.middleware.js";
import { all_users, me, update_me, change_password } from "../controllers/users.controller.js";

const users_router = Router();

users_router.get("/me", authenticate, me);
users_router.patch("/update_me", authenticate, update_me);
users_router.patch("/change_password", authenticate, change_password);

users_router.get("/", all_users);

export default users_router;