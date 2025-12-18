import { config } from "dotenv";

config({path: ".env.development"});

export const { PORT } = process.env;