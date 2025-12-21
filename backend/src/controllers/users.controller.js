import user_model from "../models/user.model.js";

export const me = async (req, res, next) => {
	try {
		const existing_user = await user_model.findById(req.user.user_id);

		if (!existing_user) {
			const error = new Error(
				"User not found.",
			);
			error.status = 404;
			throw error;
		}

		res.status(200).json({ message: "success", user: {
			id: existing_user._id,
			name: existing_user.name,
			email: existing_user.email,
			is_verified: existing_user.is_verified,
		} });
	} catch (error) {
		next(error);
	}
};
