import mongoose, { model, mongo } from "mongoose";
import bcrypt from "bcryptjs";

const user_schema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			lowercase: true,
		},
		password: {
			type: String,
			required: true,
			select: false,
			minlength: 8,
		},
		role: {
			type: String,
			enum: ["user", "admin"],
			default: "user",
		},
		is_verified: {
			type: Boolean,
			default: false,
		},
		is_banned: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true },
);

user_schema.pre("save", async function () {
	if (!this.isModified("password")) return;
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

const user_model = mongoose.models.User || mongoose.model("User", user_schema)

export default user_model;