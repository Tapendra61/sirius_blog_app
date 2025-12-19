import mongoose from "mongoose"
import { DB_URI } from "./env.js";

const connect_to_db = async () => {
	try {
		await mongoose.connect(DB_URI);
		console.log(`MongoDB connected. MongoDB name: ${mongoose.connection.name}`);
	}catch (error) {
		console.log(`Failed to connect to MongoDB database. Error: ${error}`);
		process.exit(1);
	}
};

export default connect_to_db;