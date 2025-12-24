import { Router } from "express";
import authenticate from "../middlewares/auth.middleware.js";
import { all_users, me, update_me, change_password, user, delete_user, update_user } from "../controllers/users.controller.js";
import admin_only from "../middlewares/admin.middleware.js";

const users_router = Router();

users_router.get("/me", authenticate, me);
users_router.patch("/update_me", authenticate, update_me);
users_router.patch("/change_password", authenticate, change_password);

// admin routes
users_router.get("/", authenticate, admin_only, all_users);
users_router.get("/:id", authenticate, admin_only, user);
users_router.patch("/:id", authenticate, admin_only, update_user);
users_router.delete("/:id", authenticate, admin_only, delete_user);

export default users_router;