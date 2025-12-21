import user_model from "../models/user.model.js";

const admin_only = async (req, res, next) => {
	try {
		if (!req.user) {
			const error = new Error("Unauthorized! No user info found!");
			error.status = 401;
			throw error;
		}

		const existing_user = await user_model.findById(req.user.user_id);
		if (existing_user.role !== "admin") {
			const error = new Error("Forbidden! Admins only!");
			error.status = 403;
			throw error;
		}

		next();
	} catch (error) {
		next(error);
	}
};

export default admin_only;
