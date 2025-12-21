import bcrypt from "bcryptjs";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";
import user_model from "../models/user.model.js";
import jwt from "jsonwebtoken";
import validator from "validator";

export const register = async (req, res, next) => {
	const { name, email, password } = req.body;
	try {
		if(!validator.isEmail(email)) {
			const error = new Error("Invalid email format!");
			error.status = 400;
			throw error;
		}
		
		const existing_user = await user_model.findOne({ email });

		if (existing_user) {
			const error = new Error(
				`A user with email: ${email} already exists!`,
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
			sameSite: "none",
			secure: true,
		});
		res.status(201).json({
			message: "User registered successfully.",
			user: {
				id: new_user._id,
				name: new_user.name,
				email: new_user.email,
				is_verified: new_user.is_verified,
			},
		});
	} catch (error) {
		next(error);
	}
};

export const login = async (req, res, next) => {
	const { email, password } = req.body;
	try {
		const existing_user = await user_model
			.findOne({ email })
			.select("+password");

		if (!existing_user) {
			const error = new Error(`User with email: ${email} not found.`);
			error.status = 404;
			throw error;
		}

		const password_matches = await bcrypt.compare(
			password,
			existing_user.password,
		);
		if (!password_matches) {
			const error = new Error("The password you entered is incorrect.");
			error.status = 401;
			throw error;
		}

		const token = jwt.sign({ user_id: existing_user._id }, JWT_SECRET, {
			expiresIn: JWT_EXPIRES_IN,
		});

		res.cookie("token", token, {
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24 * 7,
			sameSite: "none",
			secure: true,
		});

		res.status(201).json({
			message: "User logged in successfully.",
			token,
			user: {
				id: existing_user._id,
				name: existing_user.name,
				email: existing_user.email,
				is_verified: existing_user.is_verified,
			},
		});
	} catch (error) {
		next(error);
	}
};

export const logout = async (req, res) => {
	res.cookie("token", "", {
		httpOnly: true,
		maxAge: 0,
		sameSite: "none",
		secure: true,
	});

	res.status(200).json({ message: "Logged out successfully." });
};