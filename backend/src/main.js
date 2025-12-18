import express from "express"
import { PORT } from "./config/env.js";
import cookie_parser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookie_parser());

app.get("/", (req, res) => {
	res.send("Express App!");
});

app.listen(PORT, () => {
	console.log("Listening on port: ", PORT);
});