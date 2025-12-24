import bcrypt from "bcryptjs";
import user_model from "../models/user.model.js";
import validator from "validator";

// user routes
export const me = async (req, res, next) => {
	try {
		const existing_user = await user_model.findById(req.user.user_id);

		if (!existing_user) {
			const error = new Error("User not found.");
			error.status = 404;
			throw error;
		}

		res.status(200).json({
			message: "success",
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

export const update_me = async (req, res, next) => {
	const { new_name, new_email, password } = req.body;
	try {
		if (new_email !== undefined && !validator.isEmail(new_email)) {
			const error = new Error("Invalid email structure.");
			error.status = 400;
			throw error;
		}

		const user_with_new_email = await user_model.findOne({
			email: new_email,
		});
		if (user_with_new_email) {
			const error = new Error(
				`A user with email: ${new_email} already exists. Pick another valid email.`,
			);
			error.status = 409;
			throw error;
		}

		const existing_user = await user_model
			.findById(req.user.user_id)
			.select("+password");
		if (!existing_user) {
			const error = new Error("User not found!");
			error.status = 404;
			throw error;
		}

		if (!password) {
			const error = new Error("The password is required!");
			error.status = 400;
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

		if (new_name !== undefined && !validator.isEmpty(new_name))
			existing_user.name = new_name.trim();
		if (new_email !== undefined && !validator.isEmpty(new_email)) {
			existing_user.email = new_email.trim();
			existing_user.is_verified = false;
		}

		await existing_user.save();

		res.status(200).json({
			message: "User data updated successfully.",
			user: {
				id: existing_user.id,
				name: existing_user.name,
				email: existing_user.email,
				is_verified: existing_user.is_verified,
			},
		});
	} catch (error) {
		next(error);
	}
};

export const change_password = async (req, res, next) => {
	const { new_password, confirmed_password, current_password } = req.body;

	try {
		if (!new_password || !confirmed_password || !current_password) {
			const error = new Error(
				"All the fields are required to update the password!",
			);
			error.status = 400;
			throw error;
		}

		if (new_password !== confirmed_password) {
			const error = new Error(
				"The new password and confirmed password do not match!",
			);
			error.status = 400;
			throw error;
		}

		if (new_password.length < 8) {
			const error = new Error("Password must be of length 8 at least!");
			error.status = 400;
			throw error;
		}

		const existing_user = await user_model
			.findById(req.user.user_id)
			.select("+password");
		if (!existing_user) {
			const error = new Error("User not found!");
			error.status = 404;
			throw error;
		}

		const password_matches = await bcrypt.compare(
			current_password,
			existing_user.password,
		);
		if (!password_matches) {
			const error = new Error(
				"The current password you entered is incorrect!",
			);
			error.status = 401;
			throw error;
		}

		existing_user.password = new_password;
		await existing_user.save();

		res.status(200).json({
			message: "Your password was saved successfully.",
		});
	} catch (error) {
		next(error);
	}
};

// admin routes
export const all_users = async (req, res, next) => {
	try {
		const users = await user_model.find();
		res.status(200).json({ message: "success", users });
	} catch (error) {
		next(error);
	}
};

export const user = async (req, res, next) => {
	const { id } = req.params;

	try {
		const existing_user = await user_model.findById(id);
		if (!existing_user) {
			const error = new Error(
				`User with provided id: ${id} was not found!`,
			);
			error.status = 404;
			throw error;
		}

		res.status(200).json({ message: "User found", user: existing_user });
	} catch (error) {
		next(error);
	}
};

export const delete_user = async (req, res, next) => {
	const { id } = req.params;
	try {
		const deleted_user = await user_model.findByIdAndDelete(id);
		if (!deleted_user) {
			const error = new Error(
				`The user you are trying to delete with id: ${id} was not found!`,
			);
			error.status = 404;
			throw error;
		}

		res.status(200).json({
			message: `User with id: ${id} was deleted from db.`,
			deleted_user,
		});
	} catch (error) {
		next(error);
	}
};

export const update_user = async (req, res, next) => {
	const { new_name, new_role, is_banned } = req.body;
	const { id } = req.params;
	try {
		const existing_user = await user_model.findById(id);

		if (!existing_user) {
			const error = new Error(
				`The requested user with id: ${id} was not found!`,
			);
			error.status = 404;
			throw error;
		}

		if (typeof new_name === "string" && new_name.trim() !== "") {
			existing_user.name = new_name.trim();
		}

		if (new_role) {
			const allowed_roles = ["admin", "user"];
			if(!allowed_roles.includes(new_role)) {
				const error = new Error("Invalid role value provided!");
				error.status = 400;
				throw error;
			}
		
			existing_user.role = new_role;
		}

		if (typeof is_banned === "boolean") {
			existing_user.is_banned = is_banned;
		}
		
		await existing_user.save();

		res.status(200).json({
			message: "User updated successfully.",
			user: existing_user,
		});
	} catch (error) {
		next(error);
	}
};
