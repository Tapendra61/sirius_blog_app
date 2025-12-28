import axios from "axios";

const BASE_URL = "http://localhost:5100/api/v1/auth";

const API = axios.create({
	baseURL: BASE_URL,
	withCredentials: true,
});

export const login = async (email, password) => {
	try {
		const response = await API.post("/login", { email, password });
		return response.data;
	} catch (error) {
		// console.error(`Login error: ${error.response?.data?.message}`);
		throw error.response?.data || new Error("Login failed!");
	}
};
