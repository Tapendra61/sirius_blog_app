import { config } from "dotenv";

config({path: ".env.development"});

export const { PORT, DB_URI } = process.env;