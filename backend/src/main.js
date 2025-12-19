import express from "express";
import cookie_parser from "cookie-parser";

import connect_to_db from "./config/db.js";
import { PORT } from "./config/env.js";
import auth_router from "./routes/auth.routes.js";
import error_middleware from "./middlewares/error.middleware.js";

const app = express();

// External Middlewares
app.use(express.json());
app.use(cookie_parser());

// Internal Middlewares
app.use(error_middleware);

app.get("/", (req, res) => {
	res.send("Express App!");
});

// Routes
app.use("/api/v1/auth", auth_router);

const start_server = async () => {
	await connect_to_db();

	app.listen(PORT, () => {
		console.log("Listening on port: ", PORT);
	});
};
start_server();