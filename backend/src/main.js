import express from "express";
import cookie_parser from "cookie-parser";
import cors from "cors";

import connect_to_db from "./config/db.js";
import { PORT } from "./config/env.js";
import auth_router from "./routes/auth.routes.js";
import error_middleware from "./middlewares/error.middleware.js";
import users_router from "./routes/users.routes.js";

const app = express();

// External Middlewares
app.use(cors({
	origin: "http://localhost:5173",
	credentials: true
}));
app.use(express.json());
app.use(cookie_parser());

app.get("/", (req, res) => {
	res.send("Welcome to Sirius Blog App API!");
});

// Routes
app.use("/api/v1/auth", auth_router);
app.use("/api/v1/users", users_router);

// Internal Middlewares
app.use(error_middleware);

const start_server = async () => {
	await connect_to_db();

	app.listen(PORT, () => {
		console.log("Listening on port: ", PORT);
	});
};
start_server();