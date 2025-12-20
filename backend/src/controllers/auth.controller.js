import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";
import user_model from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
	const { name, email, password } = req.body;
	try {
		const existing_user = await user_model.findOne({ email });

		if (existing_user) {
			const error = new Error(
				`A user with email: ${email} already exists.`,
			);
			error.status = 409;
			throw error;
		}

		const new_user = await user_model.create({ name, email, password });
		const token = jwt.sign({ user_id: new_user._id }, JWT_SECRET, {
			expiresIn: JWT_EXPIRES_IN,
		});

		res.cookie("token", token, {
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24 * 7,
		});
		res.status(201).json({
			message: "User registered successfully.",
			token,
			user: {
				id: new_user._id,
				name: new_user.name,
				email: new_user.email,
			},
		});
	} catch (error) {
		next(error);
	}
};

// TODO section
export const login = async (req, res, next) => {
	const { email, password } = req.body;
	try {
		const existing_user = await user_model
			.findOne({ email })
			.select("+password");

		
	} catch (error) {
		next(error);
	}
};

export const logout = async (req, res) => {};
