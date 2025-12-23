import { Router } from "express";
import authenticate from "../middlewares/auth.middleware.js";
import { all_users, me, update_me, change_password, user } from "../controllers/users.controller.js";
import admin_only from "../middlewares/admin.middleware.js";

const users_router = Router();

users_router.get("/me", authenticate, me);
users_router.patch("/update_me", authenticate, update_me);
users_router.patch("/change_password", authenticate, change_password);

// admin routes
users_router.get("/", authenticate, admin_only, all_users);
users_router.get("/:id", authenticate, admin_only, user);

export default users_router;