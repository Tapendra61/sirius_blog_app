import express from "express"
import env from "dotenv"

env.config();
const app = express();
const PORT = process.env.PORT;

app.get("/", (req, res) => {
	res.send("Express App!");
});

app.listen(PORT, () => {
	console.log("Listening on port: ", PORT);
});