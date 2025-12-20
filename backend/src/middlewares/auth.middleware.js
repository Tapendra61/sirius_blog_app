import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";

const authenticate = (req, res, next) => {
	try {
		const token = req.headers.authorization?.split(" ")[1] || req.cookies?.token;
		
		if (!token) {
			const error = new Error("Unauthorized. Token not found.");
			error.status = 401;
			throw error;
		}
		
		// user_id encoded at login/register
		const decoded = jwt.verify(token, JWT_SECRET);
		req.user = decoded;
		
		next();
	} catch (error) {
		error.status = error.status || 401;
		next(error);
	}
};
