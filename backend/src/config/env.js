import { config } from "dotenv";

config({path: ".env.development"});

export const { PORT, DB_URI, JWT_SECRET, JWT_EXPIRES_IN } = process.env;